"use client";

import { useRouter } from "next/navigation";

import { CodeForm } from "@/components/auth/code-form";

export function MfaForm() {
  const router = useRouter();

  return <CodeForm onVerified={() => router.push("/portal")} />;
}
