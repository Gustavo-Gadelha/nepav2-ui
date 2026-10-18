import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Informe um e-mail válido."),
  password: z.string().min(1, "Informe sua senha."),
  remember: z.boolean(),
});

export type LoginValues = z.infer<typeof loginSchema>;

/** Requisitos de senha, compartilhados entre o cadastro e a recuperação de senha. */
export const passwordRules = [
  {
    id: "length",
    label: "Mínimo de 8 caracteres",
    test: (value: string) => value.length >= 8,
  },
  {
    id: "case",
    label: "Pelo menos uma letra maiúscula e uma minúscula",
    test: (value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value),
  },
  {
    id: "symbols",
    label: "Pelo menos um número e um caractere especial",
    test: (value: string) => /\d/.test(value) && /[^A-Za-z0-9]/.test(value),
  },
] as const;

export const passwordSchema = z
  .string()
  .min(1, "Crie uma senha.")
  .refine(
    (value) => passwordRules.every((rule) => rule.test(value)),
    "A senha não atende a todos os requisitos.",
  );

export const registerSchema = z
  .object({
    userType: z.string().min(1, "Selecione o tipo de usuário."),
    name: z
      .string()
      .trim()
      .min(3, "Informe seu nome completo.")
      .refine((value) => value.includes(" "), "Informe nome e sobrenome."),
    email: z.email("Informe um e-mail válido."),
    registration: z.string().trim().min(1, "Informe sua matrícula."),
    phone: z
      .string()
      .refine(
        (value) => /^\d{10,11}$/.test(value.replace(/\D/g, "")),
        "Informe um telefone válido.",
      ),
    course: z.string().min(1, "Selecione o curso."),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirme sua senha."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem.",
  });

export type RegisterValues = z.infer<typeof registerSchema>;

export const mfaSchema = z.object({
  code: z.string().length(6, "Informe os 6 dígitos do código."),
});

export type MfaValues = z.infer<typeof mfaSchema>;
