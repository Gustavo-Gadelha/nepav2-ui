import type { LucideIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type TextFieldProps = Omit<React.ComponentProps<"input">, "id"> & {
  id: string;
  label: string;
  icon?: LucideIcon;
  error?: string;
  hint?: React.ReactNode;
  /** Conteúdo à direita do label (ex.: link "Esqueci a senha"). */
  labelAside?: React.ReactNode;
  /** Elemento no fim do input (ex.: botão de mostrar senha). */
  endAdornment?: React.ReactNode;
};

/** Campo padrão das telas de autenticação: label, input com ícone, dica e erro. */
export function TextField({
  id,
  label,
  icon: Icon,
  error,
  hint,
  labelAside,
  endAdornment,
  className,
  ...props
}: TextFieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id} className="text-sm font-semibold text-primary">
          {label}
        </Label>
        {labelAside}
      </div>
      <InputGroup>
        {Icon ? (
          <InputGroupAddon>
            <Icon aria-hidden className="size-4" />
          </InputGroupAddon>
        ) : null}
        <InputGroupInput
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {endAdornment ? (
          <InputGroupAddon align="inline-end">{endAdornment}</InputGroupAddon>
        ) : null}
      </InputGroup>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
