import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Estilo do botão primário; reutilizado por links que se comportam como botão. */
export const submitButtonClass =
  "h-12 w-full gap-2 rounded-[10px] bg-primary text-base font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-card";

type SubmitButtonProps = Omit<React.ComponentProps<typeof Button>, "type"> & {
  loading?: boolean;
};

/** Botão primário das telas de autenticação: largura total, 48px, seta ou spinner. */
export function SubmitButton({
  loading = false,
  disabled,
  className,
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(submitButtonClass, className)}
      {...props}
    >
      {children}
      {loading ? (
        <Loader2 aria-hidden className="size-4 animate-spin" />
      ) : (
        <ArrowRight aria-hidden className="size-4" />
      )}
    </Button>
  );
}
