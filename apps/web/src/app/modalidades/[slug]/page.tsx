import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PlayCircle,
  AlertTriangle,
  MessageSquare,
  Lock,
  ArrowLeft,
  FileText,
  Download,
  BookOpen,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import PublicHeader from "@/components/PublicHeader";
import Markdown from "@/components/ui/Markdown";
import VideoEmbed from "@/components/ui/VideoEmbed";
import { Button } from "@/components/ui/Button";
import { GRUPO_UI } from "@/components/ui/grupo";
import { getModalidade, GRUPOS, MODALIDADES } from "@/lib/modalidades";
import { getConteudoModalidade } from "@/lib/modalidade-conteudo";
import { MODALIDADES_CONTEUDO } from "@/content/modalidades-conteudo.generated";
import { createServerSupabase } from "@/lib/supabase-server";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { slug: string } }) {
  const m = getModalidade(params.slug);
  if (!m) return {};
  return {
    title: `${m.nome} — Seguro Garantia | Traderisk Academy`,
    description: m.resumo,
  };
}

function anchor(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function ModalidadePage({ params }: { params: { slug: string } }) {
  const m = getModalidade(params.slug);
  if (!m) notFound();

  const {
    data: { user },
  } = await createServerSupabase().auth.getUser();
  const logged = !!user;

  const conteudo = MODALIDADES_CONTEUDO[m.slug];
  const sections = conteudo?.sections ?? [];
  const { videos, arquivos, cases } = await getConteudoModalidade(m.slug);

  const accent = GRUPOS[m.grupo].accent;
  const ui = GRUPO_UI[accent];
  const Icon = ui.Icon;
  const video = videos[0];

  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <PublicHeader logged={logged} />

      {/* Hero */}
      <section className="bg-hero-radial border-b border-white/5">
        <div className="container-tr py-10">
          <Link
            href="/modalidades"
            className="text-sm text-gray-400 hover:text-teal flex items-center gap-1 mb-6"
          >
            <ArrowLeft size={14} /> Todas as modalidades
          </Link>
          <div className="flex items-start gap-4">
            <span className={cn("grid place-items-center w-14 h-14 rounded-2xl shrink-0", ui.bgSoft, ui.text)}>
              <Icon size={28} />
            </span>
            <div>
              <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", ui.chip)}>
                {GRUPOS[m.grupo].label}
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-2">{m.nome}</h1>
              <p className="text-lg text-gray-300 max-w-2xl">{m.resumo}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-tr py-10 grid lg:grid-cols-3 gap-8">
        {/* Conteúdo principal */}
        <div className="lg:col-span-2 space-y-10">
          {/* Vídeo-aula */}
          <section>
            <SectionTitle icon={PlayCircle} text="Vídeo-aula" />
            <VideoEmbed url={video?.url} titulo={video?.titulo ?? m.nome} />
            {video?.descricao && <p className="text-sm text-gray-400 mt-3">{video.descricao}</p>}
          </section>

          {/* Conteúdo técnico (base de conhecimento) — em cards */}
          {sections.length > 0 && (
            <section>
              <SectionTitle icon={BookOpen} text="Entenda a modalidade" />
              {conteudo?.intro && (
                <p className="text-gray-300 mb-5 leading-relaxed">{conteudo.intro}</p>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                {sections.map((s) => (
                  <article
                    key={s.titulo}
                    id={anchor(s.titulo)}
                    className="card-surface p-5 scroll-mt-24"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn("w-1.5 h-1.5 rounded-full", ui.dot)} />
                      <h3 className="font-display font-semibold">{s.titulo}</h3>
                    </div>
                    <Markdown>{s.md}</Markdown>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Cases de sinistro — assinante */}
          <section>
            <SectionTitle icon={AlertTriangle} text="Cases de sinistro" locked={!logged} />
            {!logged ? (
              <LockedCTA texto="Cases reais de sinistro desta modalidade são exclusivos de quem tem conta." />
            ) : cases.length > 0 ? (
              <div className="space-y-4">
                {cases.map((c) => (
                  <article key={c.id} className="card-surface p-5">
                    <p className="font-display font-semibold mb-1">{c.titulo}</p>
                    {c.resumo && <p className="text-sm text-gray-300 mb-2">{c.resumo}</p>}
                    {c.conteudo && <Markdown className="text-sm">{c.conteudo}</Markdown>}
                    {c.desfecho && (
                      <p className="text-sm mt-3 border-l-2 border-teal/60 pl-3 text-gray-200">
                        <span className="text-teal font-semibold">Aprendizado: </span>
                        {c.desfecho}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <div className="card-surface p-6 text-sm text-gray-400">
                Cases desta modalidade serão publicados em breve.
              </div>
            )}
          </section>
        </div>

        {/* Aside */}
        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
          {/* Arquivos adicionais */}
          <div className="card-surface p-5">
            <SectionTitle icon={FileText} text="Arquivos" small />
            {arquivos.length > 0 ? (
              <ul className="space-y-2">
                {arquivos.map((a) => (
                  <li key={a.id}>
                    <a
                      href={a.arquivo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-white/10 p-3 hover:border-teal/40 hover:bg-white/5 transition"
                    >
                      <Download size={16} className="text-teal shrink-0" />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium truncate">{a.titulo}</span>
                        <span className="block text-xs text-gray-500">
                          {a.tipo.toUpperCase()}
                          {a.tamanho ? ` · ${a.tamanho}` : ""}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Materiais de apoio em breve.</p>
            )}
          </div>

          {/* Agente */}
          <div className="card-surface p-5">
            <SectionTitle icon={MessageSquare} text="Pergunte ao agente" small locked={!logged} />
            {logged ? (
              <>
                <p className="text-sm text-gray-300 mb-4">
                  Tire dúvidas sobre {m.nome} com o agente especialista em Seguro Garantia.
                </p>
                <Button href="/chat" size="sm" className="w-full">
                  <Sparkles size={15} /> Abrir chat
                </Button>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-300 mb-4">
                  O agente de IA responde sobre esta modalidade na versão com conta.
                </p>
                <Button href="/cadastro" size="sm" className="w-full">
                  Criar conta grátis
                </Button>
              </>
            )}
          </div>

          {/* Modalidades do mesmo grupo */}
          <div className="card-surface p-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Mesmo grupo
            </p>
            <ul className="space-y-1.5">
              {MODALIDADES.filter((x) => x.grupo === m.grupo && x.slug !== m.slug)
                .slice(0, 6)
                .map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={`/modalidades/${x.slug}`}
                      className="text-sm text-gray-300 hover:text-teal transition flex items-center gap-2"
                    >
                      <span className={cn("w-1 h-1 rounded-full", ui.dot)} />
                      {x.nome}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}

function SectionTitle({
  icon: Icon,
  text,
  locked,
  small,
}: {
  icon: LucideIcon;
  text: string;
  locked?: boolean;
  small?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2", small ? "mb-3" : "mb-4")}>
      <Icon className="text-teal" size={small ? 16 : 20} />
      <h2 className={cn("font-display font-semibold", small ? "text-sm" : "text-lg")}>{text}</h2>
      {locked && <Lock size={14} className="text-gray-500" />}
    </div>
  );
}

function LockedCTA({ texto }: { texto: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-6 text-center">
      <Lock className="text-teal mx-auto mb-2" size={22} />
      <p className="text-sm text-gray-300 mb-4">{texto}</p>
      <Button href="/cadastro" size="sm">Criar conta grátis</Button>
    </div>
  );
}
