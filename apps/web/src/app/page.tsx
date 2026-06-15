"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Scale,
  Gavel,
  Layers,
  Landmark,
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
} from "lucide-react";
import { contarProcessos } from "@/lib/api";

const GRUPOS = [
  {
    icon: Scale,
    nome: "Tradicionais",
    desc: "Licitações e contratos de obras, fornecimento e serviços.",
    itens: ["Licitação (bid)", "Execução de contrato", "Adiantamento", "Retenção de pagamento", "Manutenção corretiva"],
  },
  {
    icon: Gavel,
    nome: "Judiciais",
    desc: "Substituição de depósitos e garantias em processos.",
    itens: ["Depósito recursal trabalhista", "Judicial cível", "Judicial fiscal", "Judicial trabalhista"],
  },
  {
    icon: Layers,
    nome: "Estruturadas",
    desc: "Operações complexas e setoriais sob medida.",
    itens: ["Concessões públicas", "Completion bond", "Energia", "Créditos tributários", "Aduaneiras", "Fiança locatícia"],
  },
  {
    icon: Landmark,
    nome: "Financeiras",
    desc: "Garantias ligadas a estruturas de capital e crédito.",
    itens: ["CRA / CRI / debêntures", "Escrow accounts", "M&A", "Confissão de dívida", "Import/export", "FINEP"],
  },
];

const EM_CADA_PAGINA = [
  { icon: PlayCircle, t: "Vídeos", d: "Aulas curtas explicando a modalidade do zero." },
  { icon: AlertTriangle, t: "Cases de sinistro", d: "O que deu errado na prática e como se proteger." },
  { icon: HelpCircle, t: "Perguntas frequentes", d: "As dúvidas reais de corretores, empresas e advogados." },
  { icon: MessageSquare, t: "Chat com o agente", d: "Pergunte sobre a modalidade (requer conta).", pro: true },
];

const PRO = [
  { icon: FileSearch, t: "Análise de contratos e editais", d: "Extração de exigências, bloqueadores e estratégia de garantia." },
  { icon: Building2, t: "Aprofundamento do tomador", d: "Dados cadastrais, financeiros e histórico judicial detalhado." },
  { icon: Target, t: "Dossiê de oportunidades", d: "Garantias judiciais mapeadas a partir do polo passivo do tomador." },
];

type Resultado = {
  cnpj: string;
  razao?: string;
  trabalhista: number;
  civel: number;
  fiscal: number;
  erro?: string;
};

export default function Home() {
  const [cnpjs, setCnpjs] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState<Resultado[] | null>(null);

  const formatar = (v: string) =>
    v.replace(/\D/g, "")
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
          return {
            cnpj,
            razao: d.razao_social,
            trabalhista: d.trabalhista ?? 0,
            civel: d.civel ?? 0,
            fiscal: d.fiscal ?? 0,
          };
        } catch (e: any) {
          return { cnpj, trabalhista: 0, civel: 0, fiscal: 0, erro: e.message };
        }
      })
    );
    setResultados(out);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-navy text-white">
      <header className="sticky top-0 z-20 bg-navy/90 backdrop-blur border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-bold">Traderisk <span className="text-teal">Academy</span></span>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <a href="#modalidades" className="hover:text-teal transition">Modalidades</a>
            <a href="#ferramenta" className="hover:text-teal transition">Risco judicial</a>
            <a href="#conta" className="hover:text-teal transition">Versão completa</a>
          </nav>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/login" className="px-4 py-2 hover:text-teal transition">Entrar</Link>
            <Link href="/cadastro" className="px-4 py-2 bg-teal hover:bg-teal-light text-navy font-bold rounded-lg transition">
              Criar conta grátis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-navy to-navy-light">
        <div className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
          <p className="text-teal font-semibold mb-3">A ESCOLA DO SEGURO GARANTIA</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Domine todas as modalidades de Seguro Garantia
          </h1>
          <p className="text-lg text-gray-300 mb-9">
            Conteúdo técnico, vídeos e cases reais de sinistro para cada modalidade — das
            tradicionais às judiciais, estruturadas e financeiras. Aprenda, consulte e
            analise tomadores em um só lugar.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/modalidades" className="px-7 py-3.5 bg-teal hover:bg-teal-light text-navy font-bold rounded-lg transition">
              Explorar modalidades
            </Link>
            <a href="#ferramenta" className="px-7 py-3.5 border border-white/20 hover:border-teal rounded-lg font-semibold transition">
              Verificar risco judicial grátis
            </a>
          </div>
        </div>
      </section>

      {/* Ferramenta pública — risco judicial */}
      <section id="ferramenta" className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Quanto risco judicial este tomador carrega?</h2>
          <p className="text-gray-300">
            Sem cadastro, compare até <b>2 CNPJs</b>. Mostramos o número de ações <b>em curso</b> (não
            encerradas) em que a empresa é <b>polo passivo</b>, nas esferas trabalhista, cível e fiscal.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="space-y-3">
            {cnpjs.map((c, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={c}
                  onChange={(e) => setCnpj(i, e.target.value)}
                  placeholder={`CNPJ ${i + 1} — 00.000.000/0000-00`}
                  onKeyDown={(e) => e.key === "Enter" && analisar()}
                  className="flex-1 px-4 py-3 rounded-lg text-navy font-medium outline-none"
                />
                {cnpjs.length > 1 && (
                  <button
                    onClick={() => setCnpjs((arr) => arr.filter((_, j) => j !== i))}
                    aria-label="Remover CNPJ"
                    className="px-3 rounded-lg border border-white/15 hover:bg-white/5"
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
            <button
              onClick={analisar}
              disabled={loading}
              className="ml-auto px-7 py-3 bg-teal hover:bg-teal-light text-navy rounded-lg font-bold transition disabled:opacity-50"
            >
              {loading ? "Analisando..." : "Analisar processos"}
            </button>
          </div>
        </div>

        {resultados && (
          <div className={`grid gap-4 mt-6 ${resultados.length > 1 ? "md:grid-cols-2" : ""}`}>
            {resultados.map((r) => {
              const total = r.trabalhista + r.civel + r.fiscal;
              return (
                <div key={r.cnpj} className="bg-white/10 border border-white/10 rounded-xl p-6">
                  {r.erro ? (
                    <p className="text-red-300 text-sm">Não foi possível consultar {r.cnpj}.</p>
                  ) : (
                    <>
                      <p className="text-xs text-gray-400">{r.cnpj}</p>
                      <p className="font-bold mb-4">{r.razao || "Tomador"}</p>
                      <div className="grid grid-cols-3 gap-2 text-center mb-3">
                        {[["Trabalhista", r.trabalhista], ["Cível", r.civel], ["Fiscal", r.fiscal]].map(([l, n]) => (
                          <div key={l as string} className="bg-white/5 rounded-lg py-3">
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

      {/* Modalidades */}
      <section id="modalidades" className="bg-navy-light/40 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Uma página dedicada para cada modalidade</h2>
            <p className="text-gray-300">Vídeos, cases de sinistro e perguntas frequentes — organizados por grupo.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GRUPOS.map(({ icon: Icon, nome, desc, itens }) => (
              <Link href="/modalidades" key={nome} className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col hover:border-teal/50 transition">
                <Icon className="text-teal mb-3" size={26} />
                <p className="font-semibold mb-1">{nome}</p>
                <p className="text-sm text-gray-300 mb-4">{desc}</p>
                <ul className="space-y-1.5 mt-auto">
                  {itens.map((it) => (
                    <li key={it} className="text-sm text-gray-200 flex items-start gap-2">
                      <span className="text-teal mt-1.5 w-1 h-1 rounded-full bg-teal shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/modalidades" className="text-teal font-semibold hover:text-teal-light">
              Ver todas as modalidades →
            </Link>
          </div>
        </div>
      </section>

      {/* O que tem em cada página */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">O que você encontra em cada modalidade</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {EM_CADA_PAGINA.map(({ icon: Icon, t, d, pro }) => (
            <div key={t} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
              <Icon className="text-teal mx-auto mb-3" size={26} />
              <p className="font-semibold mb-1">
                {t} {pro && <span className="text-xs align-middle bg-teal/20 text-teal px-2 py-0.5 rounded-full">conta</span>}
              </p>
              <p className="text-sm text-gray-300">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Versão com conta */}
      <section id="conta" className="bg-navy-light/40 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <p className="text-teal font-semibold mb-2">COM A SUA CONTA</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Da teoria à operação</h2>
            <p className="text-gray-300">Ferramentas que transformam conhecimento em negócio fechado.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {PRO.map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <Icon className="text-teal mb-3" size={26} />
                <p className="font-semibold mb-1">{t}</p>
                <p className="text-sm text-gray-300">{d}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/cadastro" className="inline-block px-8 py-4 bg-teal hover:bg-teal-light text-navy font-bold rounded-lg transition">
              Criar conta grátis
            </Link>
            <p className="text-sm text-gray-400 mt-3">Sem cartão. Comece pelo conteúdo, evolua para as ferramentas.</p>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-10 text-sm text-gray-400 flex flex-wrap items-center justify-between gap-3">
        <span>Traderisk Academy — inteligência em Seguro Garantia.</span>
        <div className="flex gap-5">
          <Link href="/login" className="hover:text-teal">Entrar</Link>
          <Link href="/cadastro" className="hover:text-teal">Criar conta</Link>
        </div>
      </footer>
    </main>
  );
}
