"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AuthHeading } from "@/components/auth/auth-heading";
import { BackLink } from "@/components/auth/back-link";
import { ResendCode } from "@/components/auth/resend-code";
import { StatusIcon } from "@/components/auth/status-icon";
import {
  SubmitButton,
  submitButtonClass,
} from "@/components/auth/submit-button";
import { maskEmail } from "@/lib/auth/format";
import { resendActivation, verifyActivation } from "@/lib/auth/mock";
import { cn } from "@/lib/utils";

type Status = "verifying" | "success" | "expired";

export function ActivateAccount() {
  const params = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");

  return token ? (
    <VerifyToken token={token} email={email} />
  ) : (
    <PendingActivation email={email} />
  );
}

/** Logo após o cadastro: ainda falta clicar no link enviado por e-mail. */
function PendingActivation({ email }: { email: string | null }) {
  return (
    <>
      <AuthHeading
        title="Verifique seu e-mail"
        description={
          <>
            Enviamos um link de ativação para{" "}
            {email ? (
              <strong className="font-semibold text-foreground">
                {maskEmail(email)}
              </strong>
            ) : (
              "o seu e-mail"
            )}
            . Clique nele para ativar sua conta e acessar o portal do NEPA.
          </>
        }
      />
      <ResendCode
        onResend={resendActivation}
        question="Não recebeu o e-mail?"
        action="Reenviar e-mail"
      />
      <BackLink />
    </>
  );
}

/** Link recebido por e-mail: valida o token e mostra o resultado. */
function VerifyToken({
  token,
  email,
}: {
  token: string;
  email: string | null;
}) {
  const [status, setStatus] = useState<Status>("verifying");
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    let cancelled = false;
    verifyActivation(token).then((result) => {
      if (!cancelled) setStatus(result.ok ? "success" : "expired");
    });
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (resent) return <PendingActivation email={email} />;

  if (status === "verifying") {
    return (
      <>
        <StatusIcon variant="loading" />
        <AuthHeading
          title="Verificando seu e-mail"
          description="Aguarde enquanto confirmamos o seu link de ativação."
        />
      </>
    );
  }

  if (status === "success") {
    return (
      <>
        <StatusIcon variant="success" />
        <AuthHeading
          title="E-mail verificado com sucesso!"
          description="Sua conta acadêmica foi ativada. Agora você tem acesso aos módulos de extensão, projetos de pesquisa e serviços acadêmicos do NEPA."
        />
        {email ? (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-lg bg-secondary px-4 py-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-muted-foreground">
                Conta institucional
              </p>
              <p className="truncate text-sm font-semibold text-foreground">
                {email}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-success/12 px-3 py-1 text-xs font-semibold text-success">
              Ativa
            </span>
          </div>
        ) : null}
        <Link
          href="/login"
          className={cn(
            submitButtonClass,
            "inline-flex items-center justify-center",
          )}
        >
          Acessar o portal
        </Link>
      </>
    );
  }

  return (
    <>
      <StatusIcon variant="error" />
      <AuthHeading
        title="Link expirado"
        description="Este link de ativação expirou ou já foi utilizado. Solicite um novo e-mail para ativar sua conta."
      />
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setResending(true);
          await resendActivation();
          setResent(true);
        }}
      >
        <SubmitButton loading={resending}>
          Reenviar e-mail de ativação
        </SubmitButton>
      </form>
      <BackLink />
    </>
  );
}
