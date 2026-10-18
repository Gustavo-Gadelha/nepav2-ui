"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { AlertCircle, Mail } from "lucide-react";

import { PasswordField } from "@/components/auth/password-field";
import { SubmitButton } from "@/components/auth/submit-button";
import { TextField } from "@/components/auth/text-field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth/mock";
import { loginSchema, type LoginValues } from "@/lib/auth/schemas";

export function LoginForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  async function onSubmit(values: LoginValues) {
    setFormError(undefined);
    const result = await login(values);
    if (!result.ok) {
      setFormError(result.message);
      return;
    }
    router.push(`/mfa?email=${encodeURIComponent(values.email)}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {formError ? (
        <Alert variant="destructive">
          <AlertCircle aria-hidden />
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}

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

      <PasswordField
        id="password"
        label="Senha"
        autoComplete="current-password"
        placeholder="Digite sua senha"
        error={errors.password?.message}
        labelAside={
          <Link
            href="/recuperar-senha"
            className="text-sm font-semibold text-primary-hover underline-offset-4 hover:underline"
          >
            Esqueci a senha
          </Link>
        }
        {...register("password")}
      />

      <Controller
        control={control}
        name="remember"
        render={({ field }) => (
          <Label className="gap-2.5 text-sm font-medium text-foreground">
            <Checkbox
              className="size-4"
              checked={field.value}
              onCheckedChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
              name={field.name}
            />
            Manter conectado neste dispositivo
          </Label>
        )}
      />

      <SubmitButton loading={isSubmitting}>Entrar</SubmitButton>
    </form>
  );
}
