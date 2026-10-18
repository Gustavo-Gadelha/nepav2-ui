import type { Metadata } from "next";

import { AuthHeading } from "@/components/auth/auth-heading";
import { BackLink } from "@/components/auth/back-link";
import { CardHeader } from "@/components/auth/card-header";
import { StepBadge } from "@/components/auth/step-badge";
import { RequestForm } from "./request-form";

export const metadata: Metadata = { title: "Recuperar acesso" };

export default function RecoverPasswordPage() {
  return (
    <>
      <CardHeader aside={<StepBadge step={1} total={3} />} />
      <AuthHeading
        title="Recuperar acesso"
        description="Informe seu e-mail cadastrado para receber o código de redefinição de senha."
      />
      <RequestForm />
      <BackLink />
    </>
  );
}
