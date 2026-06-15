import Link from "next/link";

/** Cabeçalho das páginas públicas (educacional). */
export default function PublicHeader({ logged }: { logged: boolean }) {
  return (
    <header className="sticky top-0 z-20 bg-navy/90 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold">
          Traderisk <span className="text-teal">Academy</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <Link href="/modalidades" className="hover:text-teal transition">Modalidades</Link>
          <Link href="/#ferramenta" className="hover:text-teal transition">Risco judicial</Link>
        </nav>
        <div className="flex items-center gap-2 text-sm">
          {logged ? (
            <Link href="/consulta" className="px-4 py-2 bg-teal hover:bg-teal-light text-navy font-bold rounded-lg transition">
              Acessar plataforma
            </Link>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 hover:text-teal transition">Entrar</Link>
              <Link href="/cadastro" className="px-4 py-2 bg-teal hover:bg-teal-light text-navy font-bold rounded-lg transition">
                Criar conta grátis
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
