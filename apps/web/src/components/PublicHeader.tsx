import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

/** Cabeçalho das páginas públicas (educacional). */
export default function PublicHeader({ logged }: { logged: boolean }) {
  return (
    <header className="sticky top-0 z-30 bg-navy-900/80 backdrop-blur-md border-b border-white/5">
      <div className="container-tr py-3.5 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-7 text-sm text-gray-300">
          <Link href="/modalidades" className="hover:text-teal transition">Modalidades</Link>
          <Link href="/#ferramenta" className="hover:text-teal transition">Risco judicial</Link>
          <Link href="/#academia" className="hover:text-teal transition">Como funciona</Link>
        </nav>
        <div className="flex items-center gap-2 text-sm">
          {logged ? (
            <Button href="/consulta" size="sm">Acessar plataforma</Button>
          ) : (
            <>
              <Button href="/login" variant="ghost" size="sm">Entrar</Button>
              <Button href="/cadastro" size="sm">Criar conta grátis</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
