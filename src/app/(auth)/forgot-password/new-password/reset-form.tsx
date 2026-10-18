"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { PasswordField } from "@/components/auth/password-field";
import { PasswordStrength } from "@/components/auth/password-strength";
import { SubmitButton } from "@/components/auth/submit-button";
import { resetPassword } from "@/lib/auth/mock";
import { setRecoveryFlow, useRecoveryGuard } from "@/lib/auth/recovery-flow";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "@/lib/auth/schemas";

export function ResetForm() {
  const router = useRouter();
  const [done, setDone] = useState(false);
  const flow = useRecoveryGuard(3, done);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const password = useWatch({ control, name: "password" });

  async function onSubmit() {
    await resetPassword();
    const email = flow?.email ?? "";
    setDone(true);
    setRecoveryFlow(null);
    router.push(`/mfa?email=${encodeURIComponent(email)}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="space-y-3">
        <PasswordField
          id="password"
          label="Nova senha"
          autoComplete="new-password"
          placeholder="Crie uma nova senha"
          error={errors.password?.message}
          {...register("password")}
        />
        <PasswordStrength value={password} />
      </div>

      <PasswordField
        id="confirmPassword"
        label="Confirmar nova senha"
        autoComplete="new-password"
        placeholder="Repita a nova senha"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <SubmitButton loading={isSubmitting}>
        Redefinir senha e entrar
      </SubmitButton>
    </form>
  );
}
