import type { Metadata } from "next";
import Link from "next/link";

import { AuthHeading } from "@/components/auth/auth-heading";
import { CardHeader } from "@/components/auth/card-header";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = { title: "Criar conta" };

export default function RegisterPage() {
  return (
    <>
      <CardHeader />
      <AuthHeading
        title="Crie sua conta"
        description="Preencha os dados abaixo para solicitar acesso ao portal do NEPA."
      />
      <RegisterForm />
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary-hover underline-offset-4 hover:underline"
        >
          Entrar
        </Link>
      </p>
    </>
  );
}
