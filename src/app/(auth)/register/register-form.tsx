"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  AlertCircle,
  GraduationCap,
  IdCard,
  Mail,
  Smartphone,
  User,
  UsersRound,
} from "lucide-react";

import { PasswordField } from "@/components/auth/password-field";
import { PasswordStrength } from "@/components/auth/password-strength";
import { SelectField } from "@/components/auth/select-field";
import { SubmitButton } from "@/components/auth/submit-button";
import { TextField } from "@/components/auth/text-field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatPhone } from "@/lib/auth/format";
import { registerAccount } from "@/lib/auth/mock";
import { courses, userTypes } from "@/lib/auth/options";
import { registerSchema, type RegisterValues } from "@/lib/auth/schemas";

export function RegisterForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userType: "",
      name: "",
      email: "",
      registration: "",
      phone: "",
      course: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({ control, name: "password" });

  async function onSubmit(values: RegisterValues) {
    setFormError(undefined);
    const result = await registerAccount(values);
    if (!result.ok) {
      setFormError(result.message);
      return;
    }
    router.push(`/activate-account?email=${encodeURIComponent(values.email)}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {formError ? (
        <Alert variant="destructive">
          <AlertCircle aria-hidden />
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}

      <Controller
        control={control}
        name="userType"
        render={({ field }) => (
          <SelectField
            id="userType"
            label="Tipo de usuário"
            icon={UsersRound}
            placeholder="Selecione o tipo de usuário"
            options={userTypes}
            value={field.value}
            onValueChange={field.onChange}
            error={errors.userType?.message}
          />
        )}
      />

      <TextField
        id="name"
        label="Nome"
        icon={User}
        autoComplete="name"
        placeholder="Insira seu nome"
        error={errors.name?.message}
        {...register("name")}
      />

      <TextField
        id="email"
        label="E-mail"
        icon={Mail}
        type="email"
        autoComplete="email"
        placeholder="seu.email@catolicapb.edu.br"
        error={errors.email?.message}
        {...register("email")}
      />

      <div className="grid gap-6 sm:grid-cols-[5fr_6fr] sm:gap-4">
        <TextField
          id="registration"
          label="Matrícula"
          icon={IdCard}
          inputMode="numeric"
          placeholder="Sua matrícula"
          error={errors.registration?.message}
          {...register("registration")}
        />
        <TextField
          id="phone"
          label="Telefone"
          icon={Smartphone}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(00) 9 0000-0000"
          error={errors.phone?.message}
          {...register("phone", {
            onChange: (event) => {
              event.target.value = formatPhone(event.target.value);
            },
          })}
        />
      </div>

      <Controller
        control={control}
        name="course"
        render={({ field }) => (
          <SelectField
            id="course"
            label="Curso"
            icon={GraduationCap}
            placeholder="Selecione o curso"
            options={courses}
            value={field.value}
            onValueChange={field.onChange}
            error={errors.course?.message}
          />
        )}
      />

      <div className="space-y-3">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
          <PasswordField
            id="password"
            label="Senha"
            autoComplete="new-password"
            placeholder="Crie uma senha"
            error={errors.password?.message}
            {...register("password")}
          />
          <PasswordField
            id="confirmPassword"
            label="Repita a senha"
            autoComplete="new-password"
            placeholder="Repita a senha"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>
        <PasswordStrength value={password} />
      </div>

      <SubmitButton loading={isSubmitting}>Cadastrar</SubmitButton>
    </form>
  );
}
