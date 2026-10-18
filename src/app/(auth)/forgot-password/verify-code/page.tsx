import type { Metadata } from "next";

import { CardHeader } from "@/components/auth/card-header";
import { StepBadge } from "@/components/auth/step-badge";
import { RecoveryCode } from "./recovery-code";

export const metadata: Metadata = { title: "Verifique seu e-mail" };

export default function RecoveryCodePage() {
  return (
    <>
      <CardHeader aside={<StepBadge step={2} total={3} />} />
      <RecoveryCode />
    </>
  );
}
