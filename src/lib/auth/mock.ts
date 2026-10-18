import type { LoginValues, RegisterValues } from "@/lib/auth/schemas";

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

/** Qualquer cadastro é aceito, exceto o e-mail "existente@catolicapb.edu.br". */
export async function registerAccount(
  values: RegisterValues,
): Promise<AuthResult> {
  await delay();
  if (values.email.toLowerCase() === "existente@catolicapb.edu.br") {
    return { ok: false, message: "Este e-mail já está cadastrado." };
  }
  return { ok: true };
}

/** O código "123456" é válido; qualquer outro é recusado. */
export async function verifyCode(code: string): Promise<AuthResult> {
  await delay();
  if (code !== "123456") {
    return { ok: false, message: "Código inválido ou expirado." };
  }
  return { ok: true };
}

export async function resendCode(): Promise<void> {
  await delay(600);
}

/** Sempre responde com sucesso, sem revelar se o e-mail existe. */
export async function requestPasswordReset(): Promise<AuthResult> {
  await delay();
  return { ok: true };
}

export async function resetPassword(): Promise<AuthResult> {
  await delay();
  return { ok: true };
}

/** O token "expired" simula um link vencido; qualquer outro ativa a conta. */
export async function verifyActivation(token: string): Promise<AuthResult> {
  await delay(1200);
  if (token === "expired") {
    return { ok: false, message: "Link de ativação expirado." };
  }
  return { ok: true };
}

export async function resendActivation(): Promise<void> {
  await delay(600);
}
