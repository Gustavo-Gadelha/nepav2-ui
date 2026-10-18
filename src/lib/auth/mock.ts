import type { LoginValues } from "@/lib/auth/schemas";

// Ações simuladas até existir uma API real. Mantêm um contrato assíncrono
// para que a troca por `ky`/react-query não altere os componentes.

export type AuthResult = { ok: true } | { ok: false; message: string };

const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

/** Qualquer credencial é aceita, exceto a senha "errada" (para exercitar o estado de erro). */
export async function login(values: LoginValues): Promise<AuthResult> {
  await delay();
  if (values.password === "errada") {
    return { ok: false, message: "E-mail ou senha incorretos." };
  }
  return { ok: true };
}
