import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import { GRUPOS, modalidadesPorGrupo, type Grupo } from "@/lib/modalidades";
import { createServerSupabase } from "@/lib/supabase-server";

export const metadata = {
  title: "Modalidades de Seguro Garantia — Traderisk Academy",
  description: "Conheça todas as modalidades de Seguro Garantia: tradicionais, judiciais, estruturadas e financeiras.",
};

export default async function Modalidades() {
  const {
    data: { user },
  } = await createServerSupabase().auth.getUser();
  const grupos = modalidadesPorGrupo();
  const ordem: Grupo[] = ["tradicionais", "judiciais", "estruturadas", "financeiras"];

  return (
    <main className="min-h-screen bg-navy text-white">
      <PublicHeader logged={!!user} />

      <section className="max-w-6xl mx-auto px-6 py-14">
        <p className="text-teal font-semibold mb-2">BIBLIOTECA DE MODALIDADES</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Todas as modalidades de Seguro Garantia</h1>
        <p className="text-gray-300 max-w-2xl mb-12">
          Conteúdo educacional aberto. Cases de sinistro e o agente de IA são exclusivos de quem tem conta.
        </p>

        <div className="space-y-12">
          {ordem.map((g) => (
            <div key={g}>
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="text-xl font-bold">{GRUPOS[g].label}</h2>
                <span className="text-sm text-gray-400">{GRUPOS[g].desc}</span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {grupos[g].map((m) => (
                  <Link
                    key={m.slug}
                    href={`/modalidades/${m.slug}`}
                    className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:border-teal/50 transition flex flex-col"
                  >
                    <p className="font-semibold mb-1 group-hover:text-teal transition">{m.nome}</p>
                    <p className="text-sm text-gray-300 mb-3">{m.resumo}</p>
                    <span className="text-sm text-teal mt-auto flex items-center gap-1">
                      Abrir <ArrowRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
