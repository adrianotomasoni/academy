import PublicHeader from "@/components/PublicHeader";
import ModalidadeCard from "@/components/ui/ModalidadeCard";
import { GRUPO_UI } from "@/components/ui/grupo";
import { GRUPOS, ORDEM_GRUPOS, modalidadesPorGrupo } from "@/lib/modalidades";
import { createServerSupabase } from "@/lib/supabase-server";
import { cn } from "@/lib/cn";

export const metadata = {
  title: "Modalidades de Seguro Garantia — Traderisk Academy",
  description:
    "Conheça todas as modalidades de Seguro Garantia: tradicionais, judiciais, estruturadas e financeiras. Uma página dedicada para cada uma.",
};

export const dynamic = "force-dynamic";

export default async function Modalidades() {
  const {
    data: { user },
  } = await createServerSupabase().auth.getUser();
  const grupos = modalidadesPorGrupo();
  const total = Object.values(grupos).reduce((n, arr) => n + arr.length, 0);

  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <PublicHeader logged={!!user} />

      <section className="bg-hero-radial border-b border-white/5">
        <div className="container-tr py-14">
          <p className="eyebrow mb-3">Biblioteca de modalidades</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 max-w-3xl leading-tight">
            Todas as modalidades de Seguro Garantia
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg">
            {total} modalidades organizadas em 4 grupos. Cada uma tem página dedicada com
            vídeo-aula, conteúdo técnico, perguntas frequentes, cases de sinistro e arquivos.
          </p>
        </div>
      </section>

      <div className="container-tr py-14 space-y-14">
        {ORDEM_GRUPOS.map((g) => {
          const ui = GRUPO_UI[GRUPOS[g].accent];
          const Icon = ui.Icon;
          return (
            <section key={g}>
              <div className="flex items-center gap-3 mb-5">
                <span className={cn("grid place-items-center w-11 h-11 rounded-xl", ui.bgSoft, ui.text)}>
                  <Icon size={22} />
                </span>
                <div>
                  <h2 className="font-display text-xl font-bold">{GRUPOS[g].label}</h2>
                  <p className="text-sm text-gray-400">{GRUPOS[g].desc}</p>
                </div>
                <span className="ml-auto text-sm text-gray-500">{grupos[g].length} modalidades</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grupos[g].map((m) => (
                  <ModalidadeCard key={m.slug} m={m} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
