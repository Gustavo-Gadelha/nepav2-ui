/** Máscara de telefone brasileiro: (00) 0000-0000 ou (00) 9 0000-0000. */
export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
}

/** Oculta parte do e-mail: "aluno@exemplo.com" -> "a****@exemplo.com". */
export function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  return `${user[0]}${"*".repeat(Math.max(user.length - 1, 3))}@${domain}`;
}
