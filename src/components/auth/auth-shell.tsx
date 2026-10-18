import { AuthAside } from "@/components/auth/auth-aside";

/** Split 50/50: painel institucional fixo + área de autenticação com rolagem própria. */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:h-svh lg:grid-cols-2 lg:overflow-hidden">
      <AuthAside />
      <main className="flex flex-col items-center px-6 sm:px-8 lg:overflow-y-auto">
        <div className="my-auto w-full max-w-md py-12">{children}</div>
      </main>
    </div>
  );
}
