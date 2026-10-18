import Image from "next/image";

/** Painel institucional do split (visível a partir de `lg`). Idêntico em todas as telas. */
export function AuthAside() {
  return (
    <aside className="relative hidden flex-col items-center justify-center overflow-hidden bg-primary px-14 py-12 text-primary-foreground lg:flex">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_15%_10%,rgb(80_135_193/0.35),transparent),radial-gradient(55%_40%_at_90%_95%,rgb(232_154_60/0.14),transparent)]"
      />

      <div className="relative flex max-w-md flex-col items-center gap-6 text-center">
        <Image
          src="/logo-catolica.png"
          alt="Brasão da Faculdade Católica da Paraíba"
          width={336}
          height={338}
          className="h-auto w-[260px]"
          priority
        />
        <div className="space-y-2">
          <h2 className="text-[2.5rem] leading-tight font-bold tracking-tight text-balance">
            Faculdade Católica da Paraíba
          </h2>
          <p className="text-sm font-medium tracking-[0.28em] text-secondary/80 uppercase">
            Diligite lumen sapientiae
          </p>
        </div>
      </div>

      <p className="absolute inset-x-14 bottom-12 text-sm text-primary-foreground/60">
        © Faculdade Católica da Paraíba • Todos os direitos reservados
      </p>
    </aside>
  );
}
