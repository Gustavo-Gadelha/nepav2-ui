import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type BackLinkProps = {
  href?: string;
  children?: React.ReactNode;
};

/** Link de retorno padrão das telas de autenticação. */
export function BackLink({
  href = "/login",
  children = "Voltar para o login",
}: BackLinkProps) {
  return (
    <p className="mt-4 text-center">
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary-hover underline-offset-4 hover:underline"
      >
        <ArrowLeft aria-hidden className="size-4" />
        {children}
      </Link>
    </p>
  );
}
