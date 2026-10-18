import type { Metadata } from "next";
import { Suspense } from "react";

import { CardHeader } from "@/components/auth/card-header";
import { ActivateAccount } from "./activate-account";

export const metadata: Metadata = { title: "Ativação de conta" };

export default function ActivateAccountPage() {
  return (
    <>
      <CardHeader />
      <Suspense fallback={null}>
        <ActivateAccount />
      </Suspense>
    </>
  );
}
