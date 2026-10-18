import type { Metadata } from "next";

import { AuthHeading } from "@/components/auth/auth-heading";
import { BackLink } from "@/components/auth/back-link";
import { CardHeader } from "@/components/auth/card-header";
import { StepBadge } from "@/components/auth/step-badge";
import { ResetForm } from "./reset-form";

export const metadata: Metadata = { title: "Criar nova senha" };

export default function ResetPasswordPage() {
  return (
    <>
      <CardHeader aside={<StepBadge step={3} total={3} />} />
      <AuthHeading
        title="Criar nova senha"
        description="Defina uma senha segura para acessar sua conta acadêmica."
      />
      <ResetForm />
      <BackLink>Cancelar e voltar ao login</BackLink>
    </>
  );
}
