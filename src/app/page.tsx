import { redirect } from "next/navigation";

// A raiz só redireciona; não há UI a validar como navegação instantânea.
export const instant = false;

export default function Home() {
  redirect("/login");
}
