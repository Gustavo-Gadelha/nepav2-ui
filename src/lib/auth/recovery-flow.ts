import { useEffect, useMemo, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

// Estado do fluxo de recuperação de senha (mock): guarda o e-mail informado e se
// o código já foi validado, para impedir que os passos sejam pulados pela URL.

const KEY = "nepa:recovery";
const EVENT = "nepa:recovery-change";

export type RecoveryFlow = { email: string; verified: boolean };

function read(): string | null {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function setRecoveryFlow(flow: RecoveryFlow | null) {
  try {
    if (flow) sessionStorage.setItem(KEY, JSON.stringify(flow));
    else sessionStorage.removeItem(KEY);
  } catch {
    // Armazenamento indisponível: o fluxo volta ao primeiro passo.
  }
  window.dispatchEvent(new Event(EVENT));
}

/** `undefined` enquanto hidrata; `null` quando não há fluxo em andamento. */
export function useRecoveryFlow(): RecoveryFlow | null | undefined {
  const raw = useSyncExternalStore<string | null | undefined>(
    subscribe,
    read,
    () => undefined,
  );

  return useMemo(() => {
    if (raw === undefined) return undefined;
    if (!raw) return null;
    try {
      return JSON.parse(raw) as RecoveryFlow;
    } catch {
      return null;
    }
  }, [raw]);
}

/** Redireciona para o passo correto quando o fluxo não chegou até aqui. */
export function useRecoveryGuard(step: 2 | 3, disabled = false) {
  const router = useRouter();
  const flow = useRecoveryFlow();

  useEffect(() => {
    if (disabled || flow === undefined) return;
    if (flow === null) {
      router.replace("/forgot-password");
    } else if (step === 3 && !flow.verified) {
      router.replace("/forgot-password/verify-code");
    }
  }, [disabled, flow, step, router]);

  return flow;
}
