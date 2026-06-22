"use client";
import { useState } from "react";
import Link from "next/link";
import {
  PlayCircle,
  AlertTriangle,
  HelpCircle,
  MessageSquare,
  FileSearch,
  Building2,
  Target,
  Plus,
  X,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { contarProcessos } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { GRUPO_UI } from "@/components/ui/grupo";
import { GRUPOS, ORDEM_GRUPOS, modalidadesPorGrupo } from "@/lib/modalidades";
import { cn } from "@/lib/cn";

const grupos = modalidadesPorGrupo();

const EM_CADA_PAGINA = [
  { icon: PlayCircle, t: "Vídeo-aula", d: "Aulas curtas explicando a modalidade do zero." },
  { icon: HelpCircle, t: "Conteúdo técnico", d: "Definição, uso, documentação e legislação aplicável." },
  { icon: AlertTriangle, t: "Cases de sinistro", d: "O que deu errado na prática e como se proteger.", pro: true },
  { icon: MessageSquare, t: "Chat com o agente", d: "Pergunte sobre a modalidade (requer conta).", pro: true },
];

const PRO = [
  { icon: FileSearch, t: "Análise de contratos e editais", d: "Extração de exigências, bloqueadores e estratégia de garantia." },
  { icon: Building2, t: "Aprofundamento do tomador", d: "Dados cadastrais, financeiros e histórico judicial detalhado." },
  { icon: Target, t: "Dossiê de oportunidades", d: "Garantias judiciais mapeadas a partir do polo passivo do tomador." },
];

type Resultado = { cnpj: string; razao?: string; trabalhista: number; civel: number; fiscal: number; erro?: string };

export default function Home() {
  const [cnpjs, setCnpjs] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState<Resultado[] | null>(null);

  const formatar = (v: string) =>
    v
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);

  function setCnpj(i: number, v: string) {
    setCnpjs((arr) => arr.map((c, j) => (j === i ? formatar(v) : c)));
  }

  async function analisar() {
    const limpos = cnpjs.map((c) => c.replace(/\D/g, "")).filter((c) => c.length === 14).slice(0, 2);
    if (limpos.length === 0) return;
    setLoading(true);
    setResultados(null);
    const out: Resultado[] = await Promise.all(
      limpos.map(async (cnpj) => {
        try {
          const d = await contarProcessos(cnpj);
          return { cnpj, razao: d.razao_social, trabalhista: d.trabalhista ?? 0, civel: d.civel ?? 0, fiscal: d.fiscal ?? 0 };
        } catch (e: any) {
          return { cnpj, trabalhista: 0, civel: 0, fiscal: 0, erro: e.message };
        }
      }),
    );
    setResultados(out);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-navy-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-navy-900/80 backdrop-blur-md border-b border-white/5">
        <div className="container-tr py-3.5 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-7 text-sm text-gray-300">
            <a href="#modalidades" className="hover:text-teal transition">Modalidades</a>
            <a href="#ferramenta" className="hover:text-teal transition">Risco judicial</a>
            <a href="#academia" className="hover:text-teal transition">Como funciona</a>
          </nav>
          <div className="flex items-center gap-2 text-sm">
            <Button href="/login" variant="ghost" size="sm">Entrar</Button>
            <Button href="/cadastro" size="sm">Criar conta grátis</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-hero-radial">
        <div className="max-w-3xl mx-auto px-6 pt-24 pb-20 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-teal bg-teal/10 border border-teal/20 rounded-full px-3 py-1.5 mb-6">
            <ShieldCheck size={14} /> A escola do Seguro Garantia
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-[1.05]">
            Domine todas as modalidades de <span className="text-teal">Seguro Garantia</span>
          </h1>
          <p className="text-lg text-gray-300 mb-9 max-w-2xl mx-auto">
            Conteúdo técnico, vídeos e cases reais de sinistro para cada modalidade — das
            tradicionais às judiciais, estruturadas e financeiras. Aprenda, consulte e analise
            tomadores em um só lugar.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button href="/modalidades" size="lg">Explorar modalidades</Button>
            <Button href="#ferramenta" variant="secondary" size="lg">Verificar risco judicial grátis</Button>
          </div>
        </div>
      </section>

      {/* Ferramenta pública — risco judicial */}
      <section id="ferramenta" className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-8">
          <p className="eyebrow mb-2">Ferramenta gratuita</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
            Quanto risco judicial este tomador carrega?
          </h2>
          <p className="text-gray-300">
            Sem cadastro, compare até <b>2 CNPJs</b>. Mostramos o número de ações <b>em curso</b> em
            que a empresa é <b>polo passivo</b>, nas esferas trabalhista, cível e fiscal.
          </p>
        </div>

        <div className="card-surface p-6">
          <div className="space-y-3">
            {cnpjs.map((c, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={c}
                  onChange={(e) => setCnpj(i, e.target.value)}
                  placeholder={`CNPJ ${i + 1} — 00.000.000/0000-00`}
                  onKeyDown={(e) => e.key === "Enter" && analisar()}
                  className="flex-1 px-4 py-3 rounded-xl bg-white text-navy-900 font-medium outline-none focus:ring-2 focus:ring-teal"
                />
                {cnpjs.length > 1 && (
                  <button
                    onClick={() => setCnpjs((arr) => arr.filter((_, j) => j !== i))}
                    aria-label="Remover CNPJ"
                    className="px-3 rounded-xl border border-white/15 hover:bg-white/5"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            {cnpjs.length < 2 && (
              <button
                onClick={() => setCnpjs((arr) => [...arr, ""])}
                className="flex items-center gap-1.5 text-sm text-teal hover:text-teal-light"
              >
                <Plus size={16} /> Adicionar 2º CNPJ
              </button>
            )}
            <Button onClick={analisar} disabled={loading} size="md" className="ml-auto">
              {loading ? "Analisando..." : "Analisar processos"}
            </Button>
          </div>
        </div>

        {resultados && (
          <div className={cn("grid gap-4 mt-6", resultados.length > 1 && "md:grid-cols-2")}>
            {resultados.map((r) => {
              const total = r.trabalhista + r.civel + r.fiscal;
              return (
                <div key={r.cnpj} className="card-surface p-6">
                  {r.erro ? (
                    <p className="text-red-300 text-sm">Não foi possível consultar {r.cnpj}.</p>
                  ) : (
                    <>
                      <p className="text-xs text-gray-400">{r.cnpj}</p>
                      <p className="font-display font-bold mb-4">{r.razao || "Tomador"}</p>
                      <div className="grid grid-cols-3 gap-2 text-center mb-3">
                        {[["Trabalhista", r.trabalhista], ["Cível", r.civel], ["Fiscal", r.fiscal]].map(([l, n]) => (
                          <div key={l as string} className="bg-white/5 rounded-xl py-3">
                            <p className="text-2xl font-bold text-teal">{n as number}</p>
                            <p className="text-xs text-gray-300 mt-0.5">{l}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-300">
                        <b>{total}</b> ações em curso como polo passivo.
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {resultados && (
          <p className="text-center text-sm text-gray-300 mt-6">
            Quer o detalhe de cada ação, a modalidade de garantia provável e a estratégia de aprovação?{" "}
            <Link href="/cadastro" className="text-teal font-semibold whitespace-nowrap">
              Crie sua conta grátis <ArrowRight size={14} className="inline -mt-0.5" />
            </Link>
          </p>
        )}
        <p className="text-center text-xs text-gray-500 mt-4">
          Contagem agregada de ações não encerradas. O detalhamento por processo é exclusivo da versão com conta.
        </p>
      </section>

      {/* Modalidades por grupo (cards) */}
      <section id="modalidades" className="bg-navy-800/40 border-y border-white/5">
        <div className="container-tr py-20">
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">Biblioteca</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
              Uma página dedicada para cada modalidade
            </h2>
            <p className="text-gray-300">Vídeo, conteúdo técnico, cases de sinistro e arquivos — organizados por grupo.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ORDEM_GRUPOS.map((g) => {
              const ui = GRUPO_UI[GRUPOS[g].accent];
              const Icon = ui.Icon;
              return (
                <Link
                  key={g}
                  href="/modalidades"
                  className="group card-surface card-hover p-6 flex flex-col"
                >
                  <span className={cn("grid place-items-center w-12 h-12 rounded-xl mb-4", ui.bgSoft, ui.text)}>
                    <Icon size={24} />
                  </span>
                  <p className="font-display font-semibold mb-1">{GRUPOS[g].label}</p>
                  <p className="text-sm text-gray-400 mb-4">{GRUPOS[g].desc}</p>
                  <ul className="space-y-1.5 mt-auto">
                    {grupos[g].slice(0, 4).map((m) => (
                      <li key={m.slug} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className={cn("mt-1.5 w-1 h-1 rounded-full shrink-0", ui.dot)} />
                        {m.nome}
                      </li>
                    ))}
                    {grupos[g].length > 4 && (
                      <li className={cn("text-sm font-medium pt-1", ui.text)}>+{grupos[g].length - 4} modalidades</li>
                    )}
                  </ul>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Button href="/modalidades" variant="secondary">Ver todas as modalidades</Button>
          </div>
        </div>
      </section>

      {/* O que tem em cada página */}
      <section id="academia" className="container-tr py-20">
        <div className="text-center mb-12">
          <p className="eyebrow mb-2">Como funciona</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold">O que você encontra em cada modalidade</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {EM_CADA_PAGINA.map(({ icon: Icon, t, d, pro }) => (
            <div key={t} className="card-surface p-6 text-center">
              <Icon className="text-teal mx-auto mb-3" size={26} />
              <p className="font-display font-semibold mb-1">
                {t}{" "}
                {pro && <span className="text-[10px] align-middle bg-teal/20 text-teal px-2 py-0.5 rounded-full">conta</span>}
              </p>
              <p className="text-sm text-gray-400">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Versão com conta */}
      <section className="bg-navy-800/40 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">Com a sua conta</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Da teoria à operação</h2>
            <p className="text-gray-300">Ferramentas que transformam conhecimento em negócio fechado.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {PRO.map(({ icon: Icon, t, d }) => (
              <div key={t} className="card-surface p-6">
                <Icon className="text-teal mb-3" size={26} />
                <p className="font-display font-semibold mb-1">{t}</p>
                <p className="text-sm text-gray-400">{d}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/cadastro" size="lg">Criar conta grátis</Button>
            <p className="text-sm text-gray-400 mt-3">Sem cartão. Comece pelo conteúdo, evolua para as ferramentas.</p>
          </div>
        </div>
      </section>

      <footer className="container-tr py-10 text-sm text-gray-400 flex flex-wrap items-center justify-between gap-3">
        <Logo />
        <span className="text-gray-500">Inteligência em Seguro Garantia.</span>
        <div className="flex gap-5">
          <Link href="/login" className="hover:text-teal">Entrar</Link>
          <Link href="/cadastro" className="hover:text-teal">Criar conta</Link>
        </div>
      </footer>
    </main>
  );
}
