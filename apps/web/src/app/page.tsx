"use client";
import { useState } from "react";
import Link from "next/link";
import { Building2, GraduationCap, MessageSquare, ShieldCheck } from "lucide-react";
import { consultarDossie } from "@/lib/api";
import { Card, ProBadge } from "@/components/Card";

const RECURSOS = [
  { icon: Building2, t: "Consulta CNPJ", d: "Dossiê com processos e contratos públicos" },
  { icon: GraduationCap, t: "Academia", d: "Trilhas técnicas de Seguro Garantia" },
  { icon: MessageSquare, t: "Chat IA", d: "Especialista com fontes citadas" },
  { icon: ShieldCheck, t: "Guia de seguradoras", d: "Match por perfil e linhas de corte" },
];

export default function Home() {
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);
  const [dossie, setDossie] = useState<any>(null);
  const [erro, setErro] = useState("");

  const formatar = (v: string) =>
    v.replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);

  async function analisar() {
    setErro("");
    setLoading(true);
    setDossie(null);
    try {
      const limpo = cnpj.replace(/\D/g, "");
      if (limpo.length !== 14) throw new Error("CNPJ inválido");
      setDossie(await consultarDossie(limpo));
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-navy to-navy-light text-white">
      <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <span className="font-bold">Traderisk <span className="text-teal">Academy</span></span>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/login" className="px-4 py-2 hover:text-teal transition">Entrar</Link>
          <Link href="/cadastro" className="px-4 py-2 bg-teal hover:bg-teal-light text-navy font-bold rounded-lg transition">
            Criar conta grátis
          </Link>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-6 pt-16 pb-12 text-center">
        <p className="text-teal font-semibold mb-3">INTELIGÊNCIA EM SEGURO GARANTIA</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">O que você sabe sobre este tomador?</h1>
        <p className="text-lg text-gray-300 mb-10">
          Digite o CNPJ e veja em segundos: processos judiciais, contratos públicos
          e chances de aprovação em Seguro Garantia.
        </p>

        <div className="flex gap-3 max-w-xl mx-auto">
          <input
            value={cnpj}
            onChange={(e) => setCnpj(formatar(e.target.value))}
            placeholder="00.000.000/0000-00"
            onKeyDown={(e) => e.key === "Enter" && analisar()}
            className="flex-1 px-5 py-4 rounded-lg text-navy text-lg font-medium outline-none"
          />
          <button onClick={analisar} disabled={loading}
            className="px-8 py-4 bg-teal hover:bg-teal-light text-navy rounded-lg font-bold transition disabled:opacity-50">
            {loading ? "Analisando..." : "Analisar"}
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-3">Sem cadastro. Resultado em segundos. Gratuito.</p>
        {erro && <p className="text-red-300 mt-4">{erro}</p>}
      </section>

      {dossie && (
        <section className="max-w-4xl mx-auto px-6 pb-12 grid md:grid-cols-2 gap-4">
          <Card titulo="Cadastral">
            <p className="font-bold">{dossie.cadastral?.razao_social}</p>
            <p className="text-sm text-gray-300 mt-1">Situação: {dossie.cadastral?.situacao}</p>
            <p className="text-sm text-gray-300">CNAE: {dossie.cadastral?.cnae_principal}</p>
            <p className="text-sm text-gray-300">Porte: {dossie.cadastral?.porte}</p>
          </Card>
          <Card titulo="Processos judiciais">
            <p className="text-sm">Trabalhista: <b>{dossie.processos?.trabalhista}</b></p>
            <p className="text-sm">Cível: <b>{dossie.processos?.civel}</b></p>
            <p className="text-sm">Fiscal: <b>{dossie.processos?.fiscal}</b></p>
          </Card>
          <Card titulo="Setor público">
            <p className="text-sm">
              {dossie.contratos_publicos?.participa ? "✅ Participa de licitações" : "Não identificado em licitações"}
            </p>
          </Card>
          <Card titulo="Potencial de garantia" acao={<ProBadge />}>
            <span className={`inline-block px-4 py-2 rounded-full font-bold ${
              dossie.score_potencial === "alto" ? "bg-teal text-navy" :
              dossie.score_potencial === "medio" ? "bg-yellow-500 text-navy" : "bg-gray-500"
            }`}>
              {dossie.score_potencial?.toUpperCase()}
            </span>
            <p className="text-sm text-gray-300 mt-3">
              Diagnóstico completo e estratégia de aprovação no plano Pro.{" "}
              <Link href="/cadastro" className="text-teal font-semibold">Criar conta →</Link>
            </p>
          </Card>
        </section>
      )}

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">Tudo em uma plataforma</h2>
        <p className="text-gray-300 text-center mb-10">Comece grátis. Faça upgrade quando precisar do diagnóstico completo.</p>
        <div className="grid md:grid-cols-4 gap-4">
          {RECURSOS.map(({ icon: Icon, t, d }) => (
            <div key={t} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
              <Icon className="text-teal mx-auto mb-3" size={26} />
              <p className="font-semibold mb-1">{t}</p>
              <p className="text-sm text-gray-300">{d}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/cadastro" className="inline-block px-8 py-4 bg-teal hover:bg-teal-light text-navy font-bold rounded-lg transition">
            Criar conta grátis
          </Link>
        </div>
      </section>
    </main>
  );
}
