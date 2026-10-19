export function AuthHeading({
  title,
  description,
  icon,
}: {
  title: string;
  /** Ícone exibido na mesma linha, depois do título. */
  icon?: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className="mb-8 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl leading-tight font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {icon}
      </div>
      {description ? (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
