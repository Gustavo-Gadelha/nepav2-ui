import { AlertCircle, Check, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const variants = {
  loading: { icon: Loader2, className: "bg-secondary text-primary" },
  success: { icon: Check, className: "bg-success/12 text-success" },
  error: { icon: AlertCircle, className: "bg-destructive/12 text-destructive" },
} as const;

/** Ícone circular que ilustra o estado de uma tela (verificando, sucesso, erro…). */
export function StatusIcon({ variant }: { variant: keyof typeof variants }) {
  const { icon: Icon, className } = variants[variant];

  return (
    <span
      aria-hidden
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-full",
        className,
      )}
    >
      <Icon className={cn("size-5", variant === "loading" && "animate-spin")} />
    </span>
  );
}
