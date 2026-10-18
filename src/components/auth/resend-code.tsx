"use client";

import { useEffect, useState } from "react";

type ResendCodeProps = {
  onResend: () => Promise<void>;
  /** Tempo de espera entre reenvios, em segundos. */
  seconds?: number;
};

function formatTime(total: number) {
  const minutes = Math.floor(total / 60);
  const seconds = String(total % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

/** Linha "Não recebeu o código? Reenviar" com contagem regressiva para o reenvio. */
export function ResendCode({ onResend, seconds = 60 }: ResendCodeProps) {
  const [remaining, setRemaining] = useState(seconds);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setTimeout(() => setRemaining((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining]);

  async function handleResend() {
    setSending(true);
    await onResend();
    setSending(false);
    setRemaining(seconds);
  }

  return (
    <p className="mt-4 text-center text-sm text-muted-foreground">
      Não recebeu o código?{" "}
      <button
        type="button"
        disabled={remaining > 0 || sending}
        onClick={handleResend}
        className="font-semibold text-primary-hover underline-offset-4 hover:underline disabled:pointer-events-none disabled:text-muted-foreground"
      >
        {sending
          ? "Enviando…"
          : remaining > 0
            ? `Reenviar em ${formatTime(remaining)}`
            : "Reenviar código"}
      </button>
    </p>
  );
}
