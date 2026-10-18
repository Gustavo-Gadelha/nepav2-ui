import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthHeading } from "@/components/auth/auth-heading";
import { BackLink } from "@/components/auth/back-link";
import { CardHeader } from "@/components/auth/card-header";
import { MfaForm } from "./mfa-form";
import { MfaIntro } from "./mfa-intro";

export const metadata: Metadata = { title: "Verificação em duas etapas" };

export default function MfaPage() {
  return (
    <>
      <CardHeader />
      <Suspense fallback={<AuthHeading title="Verificação em duas etapas" />}>
        <MfaIntro />
      </Suspense>
      <MfaForm />
      <BackLink />
    </>
  );
}
