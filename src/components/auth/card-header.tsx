import Image from "next/image";

/** Cabeçalho do card: marca NEPA à esquerda e, opcionalmente, um badge (ex.: passo) à direita. */
export function CardHeader({ aside }: { aside?: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <Image
          src="/logo-nepa.png"
          alt=""
          width={334}
          height={341}
          className="h-auto w-12 shrink-0"
        />
        <div className="min-w-0 leading-tight">
          <p className="text-lg font-bold text-primary">NEPA</p>
          <p className="text-xs text-muted-foreground">
            Núcleo de Extensão e Pesquisa Acadêmica
          </p>
        </div>
      </div>
      {aside}
    </div>
  );
}
