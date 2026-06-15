"use client";
import { useState } from "react";
import { consultarDossie } from "@/lib/api";

export default function Home() {
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);
  const [dossie, setDossie] = useState<any>(null);
  const [erro, setErro] = useState("");

  const formatarCnpj = (v: string) =>
    v.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2").slice(0, 18);

  async function analisar() {
    setErro(""); setLoading(true); setDossie(null);
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
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-teal font-semibold mb-3">TRADERISK ACADEMY</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          O que você sabe sobre este tomador?
        </h1>
        <p className="text-lg text-gray-300 mb-10">
          Digite o CNPJ e veja em segundos: processos judiciais, contratos
          públicos e chances de aprovação em Seguro Garantia.
        </p>

        <div className="flex gap-3 max-w-xl mx-auto">
          <input
            value={cnpj}
            onChange={(e) => setCnpj(formatarCnpj(e.target.value))}
            placeholder="00.000.000/0000-00"
            className="flex-1 px-5 py-4 rounded-lg text-navy text-lg font-medium outline-none"
            onKeyDown={(e) => e.key === "Enter" && analisar()}
          />
          <button
            onClick={analisar}
            disabled={loading}
            className="px-8 py-4 bg-teal hover:bg-teal-light rounded-lg font-bold transition disabled:opacity-50"
          >
            {loading ? "Analisando..." : "Analisar"}
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-3">Sem cadastro. Resultado em segundos. Gratuito.</p>
        {erro && <p className="text-red-300 mt-4">{erro}</p>}
      </section>

      {/* Resultado */}
      {dossie && (
        <section className="max-w-4xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-4">
          <Card titulo="Cadastral">
            <p className="font-bold">{dossie.cadastral?.razao_social}</p>
            <p className="text-sm text-gray-300">Situação: {dossie.cadastral?.situacao}</p>
            <p className="text-sm text-gray-300">CNAE: {dossie.cadastral?.cnae_principal}</p>
            <p className="text-sm text-gray-300">Porte: {dossie.cadastral?.porte}</p>
          </Card>
          <Card titulo="Processos Judiciais">
            <p className="text-sm">Trabalhista: <b>{dossie.processos?.trabalhista}</b></p>
            <p className="text-sm">Cível: <b>{dossie.processos?.civel}</b></p>
            <p className="text-sm">Fiscal: <b>{dossie.processos?.fiscal}</b></p>
          </Card>
          <Card titulo="Setor Público">
            <p className="text-sm">
              {dossie.contratos_publicos?.participa
                ? "✅ Participa de licitações"
                : "Não identificado em licitações"}
            </p>
          </Card>
          <Card titulo="Potencial de Garantia">
            <span className={`inline-block px-4 py-2 rounded-full font-bold ${
              dossie.score_potencial === "alto" ? "bg-teal" :
              dossie.score_potencial === "medio" ? "bg-yellow-500" : "bg-gray-500"
            }`}>
              {dossie.score_potencial?.toUpperCase()}
            </span>
            <p className="text-sm text-gray-300 mt-3">
              Veja o diagnóstico completo e a estratégia de aprovação no plano Pro.
            </p>
          </Card>
        </section>
      )}
    </main>
  );
}

function Card({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10">
      <p className="text-teal font-semibold mb-3">{titulo}</p>
      {children}
    </div>
  );
}
