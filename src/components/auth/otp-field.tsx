"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type OtpFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onComplete?: () => void;
  error?: string;
  disabled?: boolean;
  length?: number;
};

/** Campo de código numérico (6 dígitos) das telas de autenticação. */
export function OtpField({
  id,
  value,
  onChange,
  onComplete,
  error,
  disabled,
  length = 6,
}: OtpFieldProps) {
  return (
    <div className="space-y-2">
      <InputOTP
        id={id}
        maxLength={length}
        value={value}
        onChange={onChange}
        onComplete={onComplete}
        pattern={REGEXP_ONLY_DIGITS}
        inputMode="numeric"
        autoComplete="one-time-code"
        disabled={disabled}
        aria-label="Código de verificação"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        containerClassName="w-full"
        autoFocus
      >
        <InputOTPGroup>
          {Array.from({ length }, (_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              aria-invalid={error ? true : undefined}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
