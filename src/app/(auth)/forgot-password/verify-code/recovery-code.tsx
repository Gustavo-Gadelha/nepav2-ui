"use client";

import { useRouter } from "next/navigation";

import { AuthHeading } from "@/components/auth/auth-heading";
import { BackLink } from "@/components/auth/back-link";
import { CodeForm } from "@/components/auth/code-form";
import { maskEmail } from "@/lib/auth/format";
import { setRecoveryFlow, useRecoveryGuard } from "@/lib/auth/recovery-flow";

export function RecoveryCode() {
  const router = useRouter();
  const flow = useRecoveryGuard(2);

  return (
    <>
      <AuthHeading
        title="Verifique seu e-mail"
        description={
          flow ? (
            <>
              Enviamos um código de segurança de 6 dígitos para{" "}
              <strong className="font-semibold text-foreground">
                {maskEmail(flow.email)}
              </strong>
              . Digite-o abaixo para continuar.
            </>
          ) : (
            "Enviamos um código de segurança de 6 dígitos para o seu e-mail. Digite-o abaixo para continuar."
          )
        }
      />
      <CodeForm
        onVerified={() => {
          setRecoveryFlow({ email: flow?.email ?? "", verified: true });
          router.push("/forgot-password/new-password");
        }}
      />
      <BackLink />
    </>
  );
}
