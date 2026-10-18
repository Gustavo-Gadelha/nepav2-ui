"use client";

import type { LucideIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Option } from "@/lib/auth/options";
import { cn } from "@/lib/utils";

type SelectFieldProps = {
  id: string;
  label: string;
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  icon?: LucideIcon;
  error?: string;
  className?: string;
};

/** Select padrão das telas de autenticação, com o mesmo visual do TextField. */
export function SelectField({
  id,
  label,
  options,
  value,
  onValueChange,
  placeholder,
  icon: Icon,
  error,
  className,
}: SelectFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-sm font-semibold text-primary">
        {label}
      </Label>
      <Select
        items={options}
        value={value || null}
        onValueChange={(next) => onValueChange(next ?? "")}
      >
        <SelectTrigger
          id={id}
          className="w-full gap-3"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          {Icon ? (
            <Icon aria-hidden className="size-4 text-muted-foreground" />
          ) : null}
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
