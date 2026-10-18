"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";

import { SubmitButton } from "@/components/auth/submit-button";
import { TextField } from "@/components/auth/text-field";
import { requestPasswordReset } from "@/lib/auth/mock";
import { setRecoveryFlow } from "@/lib/auth/recovery-flow";
import {
  requestResetSchema,
  type RequestResetValues,
} from "@/lib/auth/schemas";

export function RequestForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestResetValues>({
    resolver: zodResolver(requestResetSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: RequestResetValues) {
    await requestPasswordReset();
    setRecoveryFlow({ email: values.email, verified: false });
    router.push("/forgot-password/verify-code");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <TextField
        id="email"
        label="E-mail"
        icon={Mail}
        type="email"
        autoComplete="email"
        placeholder="seu.email@catolicapb.edu.br"
        error={errors.email?.message}
        {...register("email")}
      />

      <SubmitButton loading={isSubmitting}>Enviar código</SubmitButton>
    </form>
  );
}
