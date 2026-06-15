"use client";
import { useState } from "react";
import { Card } from "@/components/Card";
import { consultarDossie } from "@/lib/api";
import { getToken } from "@/lib/session";

export default function Consulta() {
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
      const token = await getToken();
      setDossie(await consultarDossie(limpo, token));
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }

  const completo = dossie && Array.isArray(dossie.processos?.processos);

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-1">Dossiê do tomador</h1>
      <p className="text-gray-300 mb-6">Consulta integrada por CNPJ — cadastral, judicial e setor público.</p>

      <div className="flex gap-3 mb-6 max-w-xl">
        <input
          value={cnpj}
          onChange={(e) => setCnpj(formatar(e.target.value))}
          placeholder="00.000.000/0000-00"
          onKeyDown={(e) => e.key === "Enter" && analisar()}
          className="flex-1 px-4 py-3 rounded-lg text-navy font-medium outline-none"
        />
        <button
          onClick={analisar}
          disabled={loading}
          className="px-7 py-3 bg-teal hover:bg-teal-light rounded-lg font-bold transition disabled:opacity-50"
        >
          {loading ? "Analisando..." : "Analisar"}
        </button>
      </div>
      {erro && <p className="text-red-300 mb-4">{erro}</p>}

      {dossie && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card titulo="Cadastral">
            <p className="font-bold">{dossie.cadastral?.razao_social}</p>
            <p className="text-sm text-gray-300 mt-1">Situação: {dossie.cadastral?.situacao}</p>
            <p className="text-sm text-gray-300">CNAE: {dossie.cadastral?.cnae_principal}</p>
            <p className="text-sm text-gray-300">Porte: {dossie.cadastral?.porte}</p>
          </Card>
          <Card titulo="Processos judiciais">
            <p className="text-sm">Trabalhista: <b>{dossie.processos?.trabalhista ?? dossie.processos?.total_trabalhista}</b></p>
            <p className="text-sm">Cível: <b>{dossie.processos?.civel ?? dossie.processos?.total_civel}</b></p>
            <p className="text-sm">Fiscal: <b>{dossie.processos?.fiscal ?? dossie.processos?.total_fiscal}</b></p>
          </Card>
          <Card titulo="Setor público">
            <p className="text-sm">
              {dossie.contratos_publicos?.participa || dossie.contratos_publicos?.total > 0
                ? "✅ Participa de licitações"
                : "Não identificado em licitações"}
            </p>
          </Card>
          <Card titulo="Potencial de garantia">
            <span className={`inline-block px-4 py-2 rounded-full font-bold ${
              dossie.score_potencial === "alto" ? "bg-teal" :
              dossie.score_potencial === "medio" ? "bg-yellow-500" : "bg-gray-500"
            }`}>
              {dossie.score_potencial?.toUpperCase()}
            </span>
            {!completo && (
              <p className="text-sm text-gray-300 mt-3">
                Detalhes de processos e estratégia de aprovação no plano Pro.
              </p>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
