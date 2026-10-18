"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

import { TextField, type TextFieldProps } from "@/components/auth/text-field";
import { InputGroupButton } from "@/components/ui/input-group";

/** TextField de senha com alternância de visibilidade. */
export function PasswordField(
  props: Omit<TextFieldProps, "type" | "endAdornment">,
) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      icon={Lock}
      {...props}
      type={visible ? "text" : "password"}
      endAdornment={
        <InputGroupButton
          size="icon-sm"
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? (
            <EyeOff aria-hidden className="size-4" />
          ) : (
            <Eye aria-hidden className="size-4" />
          )}
        </InputGroupButton>
      }
    />
  );
}
