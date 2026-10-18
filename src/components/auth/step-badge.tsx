/** Indicador de passo ("Passo 2 de 3"), exibido à direita do cabeçalho. */
export function StepBadge({ step, total }: { step: number; total: number }) {
  return (
    <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-semibold whitespace-nowrap text-primary">
      Passo {step} de {total}
    </span>
  );
}
