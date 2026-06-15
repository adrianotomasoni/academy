import Link from "next/link";
import { notFound } from "next/navigation";
import { PlayCircle, HelpCircle, AlertTriangle, MessageSquare, Lock, ArrowLeft } from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import { getModalidade, faqDaModalidade, GRUPOS } from "@/lib/modalidades";
import { createServerSupabase } from "@/lib/supabase-server";

// Gating de cases/agente depende da sessão (cookies) → render por requisição.
export const dynamic = "force-dynamic";

export default async function ModalidadePage({ params }: { params: { slug: string } }) {
  const m = getModalidade(params.slug);
  if (!m) notFound();

  const {
    data: { user },
  } = await createServerSupabase().auth.getUser();
  const logged = !!user;
  const faq = faqDaModalidade(m);

  return (
    <main className="min-h-screen bg-navy text-white">
      <PublicHeader logged={logged} />

      <article className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/modalidades" className="text-sm text-gray-400 hover:text-teal flex items-center gap-1 mb-6">
          <ArrowLeft size={14} /> Modalidades
        </Link>

        <span className="text-xs font-medium bg-teal/15 text-teal px-2.5 py-1 rounded-full">{GRUPOS[m.grupo].label}</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-3">{m.nome}</h1>
        <p className="text-lg text-gray-300 mb-10">{m.resumo}</p>

        {/* Vídeo-aula — livre */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <PlayCircle className="text-teal" size={20} />
            <h2 className="text-lg font-semibold">Vídeo-aula</h2>
          </div>
          <div className="aspect-video bg-white/5 border border-white/10 rounded-xl grid place-items-center">
            <div className="text-center">
              <PlayCircle className="text-teal mx-auto mb-2" size={44} />
              <p className="text-sm text-gray-400">Aula introdutória — {m.nome}</p>
            </div>
          </div>
        </section>

        {/* FAQ — livre */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="text-teal" size={20} />
            <h2 className="text-lg font-semibold">Perguntas frequentes</h2>
          </div>
          <div className="space-y-3">
            {faq.map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="font-medium mb-1">{f.q}</p>
                <p className="text-sm text-gray-300">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cases de sinistro — assinante */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-teal" size={20} />
            <h2 className="text-lg font-semibold">Cases de sinistro</h2>
            {!logged && <Lock size={15} className="text-gray-400" />}
          </div>
          {logged ? (
            <div className="space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="font-medium mb-1">Sinistro por inadimplemento contratual</p>
                <p className="text-sm text-gray-300">
                  Como a apólice foi acionada, o que a seguradora exigiu para indenizar e o aprendizado de subscrição.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="font-medium mb-1">Disputa sobre a configuração do sinistro</p>
                <p className="text-sm text-gray-300">
                  O ponto controverso entre tomador, segurado e seguradora — e como evitar na originação.
                </p>
              </div>
            </div>
          ) : (
            <LockedCTA texto="Cases reais de sinistro desta modalidade são exclusivos de assinantes." />
          )}
        </section>

        {/* Agente — assinante */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="text-teal" size={20} />
            <h2 className="text-lg font-semibold">Pergunte ao agente</h2>
            {!logged && <Lock size={15} className="text-gray-400" />}
          </div>
          {logged ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-between gap-4">
              <p className="text-sm text-gray-300">Tire dúvidas sobre {m.nome} com o agente especialista.</p>
              <Link href="/chat" className="shrink-0 px-5 py-2.5 bg-teal hover:bg-teal-light text-navy font-bold rounded-lg transition">
                Abrir chat
              </Link>
            </div>
          ) : (
            <LockedCTA texto="O agente de IA responde sobre esta modalidade na versão com conta." />
          )}
        </section>
      </article>
    </main>
  );
}

function LockedCTA({ texto }: { texto: string }) {
  return (
    <div className="bg-white/5 border border-dashed border-white/15 rounded-xl p-6 text-center">
      <Lock className="text-teal mx-auto mb-2" size={22} />
      <p className="text-sm text-gray-300 mb-4">{texto}</p>
      <Link href="/cadastro" className="inline-block px-6 py-2.5 bg-teal hover:bg-teal-light text-navy font-bold rounded-lg transition">
        Criar conta grátis
      </Link>
    </div>
  );
}
