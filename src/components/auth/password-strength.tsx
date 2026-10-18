import { Check, Circle } from "lucide-react";

import { passwordRules } from "@/lib/auth/schemas";
import { cn } from "@/lib/utils";

const levels = ["Fraca", "Média", "Forte"] as const;

/** Indicador de força + checklist dos requisitos da senha. */
export function PasswordStrength({ value }: { value: string }) {
  const met = passwordRules.filter((rule) => rule.test(value));
  const score = met.length;

  return (
    <div className="space-y-3 rounded-lg bg-secondary px-4 py-3.5">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-muted-foreground">Força da senha</span>
        <span className="text-primary" aria-live="polite">
          {score > 0 ? levels[score - 1] : "—"}
        </span>
      </div>
      <div aria-hidden className="grid grid-cols-3 gap-1.5">
        {passwordRules.map((rule, index) => (
          <span
            key={rule.id}
            className={cn(
              "h-1 rounded-full transition-colors",
              index < score ? "bg-primary" : "bg-primary/15",
            )}
          />
        ))}
      </div>
      <ul className="space-y-1.5">
        {passwordRules.map((rule) => {
          const ok = rule.test(value);
          const Icon = ok ? Check : Circle;
          return (
            <li
              key={rule.id}
              className={cn(
                "flex items-center gap-2 text-sm",
                ok ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <Icon
                aria-hidden
                className={cn("size-4 shrink-0", ok && "text-primary")}
              />
              {rule.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
