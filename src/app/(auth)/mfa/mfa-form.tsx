"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { AlertCircle, Info } from "lucide-react";

import { OtpField } from "@/components/auth/otp-field";
import { ResendCode } from "@/components/auth/resend-code";
import { SubmitButton } from "@/components/auth/submit-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { resendCode, verifyCode } from "@/lib/auth/mock";
import { mfaSchema, type MfaValues } from "@/lib/auth/schemas";

export function MfaForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string>();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MfaValues>({
    resolver: zodResolver(mfaSchema),
    defaultValues: { code: "" },
  });

  async function onSubmit(values: MfaValues) {
    setFormError(undefined);
    const result = await verifyCode(values.code);
    if (!result.ok) {
      setFormError(result.message);
      return;
    }
    router.push("/portal");
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        {formError ? (
          <Alert variant="destructive">
            <AlertCircle aria-hidden />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        ) : null}

        <div className="space-y-3">
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <OtpField
                id="code"
                value={field.value}
                onChange={(value) => {
                  setFormError(undefined);
                  field.onChange(value);
                }}
                disabled={isSubmitting}
                error={errors.code?.message}
              />
            )}
          />
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Info aria-hidden className="size-3.5" />
            Código expira em 10 minutos
          </p>
        </div>

        <SubmitButton loading={isSubmitting}>Validar código</SubmitButton>
      </form>
      <ResendCode onResend={resendCode} />
    </>
  );
}
