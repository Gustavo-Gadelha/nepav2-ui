"use client";

import { useSearchParams } from "next/navigation";

import { AuthHeading } from "@/components/auth/auth-heading";
import { maskEmail } from "@/lib/auth/format";

/** Título da verificação; mostra o e-mail mascarado quando ele vem na URL. */
export function MfaIntro() {
  const email = useSearchParams().get("email");

  return (
    <AuthHeading
      title="Verificação em duas etapas"
      description={
        email ? (
          <>
            Enviamos um código de segurança de 6 dígitos para{" "}
            <strong className="font-semibold text-foreground">
              {maskEmail(email)}
            </strong>
            . Digite-o abaixo para continuar.
          </>
        ) : (
          "Enviamos um código de segurança de 6 dígitos para o seu e-mail. Digite-o abaixo para continuar."
        )
      }
    />
  );
}
