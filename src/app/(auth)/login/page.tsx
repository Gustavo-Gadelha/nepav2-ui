import type { Metadata } from "next";
import Link from "next/link";

import { AuthHeading } from "@/components/auth/auth-heading";
import { CardHeader } from "@/components/auth/card-header";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <>
      <CardHeader />
      <AuthHeading
        title="Acesse sua conta"
        description="Entre com seu e-mail institucional para acessar o portal do NEPA."
      />
      <LoginForm />
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Ainda não tem conta?{" "}
        <Link
          href="/cadastro"
          className="font-semibold text-primary-hover underline-offset-4 hover:underline"
        >
          Cadastre-se
        </Link>
      </p>
    </>
  );
}
