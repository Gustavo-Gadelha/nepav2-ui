import { AuthAside } from "@/components/auth/auth-aside";

/** Split 50/50: painel institucional + área de autenticação sem card. */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <AuthAside />
      <main className="flex flex-col items-center justify-center gap-10 px-6 py-12 sm:px-8">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
