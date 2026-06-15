"use client";
import { useState } from "react";
import { Upload } from "lucide-react";
import { analisarDocumento } from "@/lib/api";
import { getToken } from "@/lib/session";

export default function Contratos() {
  const [arquivo, setArquivo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState<any>(null);

  async function onArquivo(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setArquivo(f.name);
    setErro("");
    setResultado(null);
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) throw new Error("Sessão expirada. Entre novamente.");
      setResultado(await analisarDocumento(f, token));
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Análise de contratos</h1>
      <p className="text-gray-300 mb-5">Envie um edital ou contrato — extração de exigências, bloqueadores e alertas.</p>

      <label className="border border-dashed border-white/20 rounded-xl p-5 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition">
        <Upload className="text-teal" size={22} />
        <div>
          <p className="text-sm font-medium">{arquivo ?? "Selecionar PDF ou DOCX"}</p>
          <p className="text-xs text-gray-300">{loading ? "Analisando…" : "PDF, DOCX · até 20 MB"}</p>
        </div>
        <input type="file" accept=".pdf,.docx" className="hidden" onChange={onArquivo} />
      </label>

      {erro && <p className="text-red-300 text-sm mt-4">{erro}</p>}

      {resultado ? (
        <pre className="mt-5 bg-white/10 border border-white/10 rounded-xl p-4 text-xs text-gray-200 overflow-auto max-h-96">
          {JSON.stringify(resultado, null, 2)}
        </pre>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 mt-5">
          <div className="bg-white/10 border border-white/10 rounded-xl p-5">
            <p className="text-teal font-semibold text-sm uppercase tracking-wide mb-3">Identificação (exemplo)</p>
            <p className="text-sm leading-relaxed">Modalidade: <b>Garantia de execução</b><br />IS exigida: <b>5% do contrato</b><br />Vigência: <b>vigência + 90 dias</b></p>
          </div>
          <div className="bg-white/10 border border-white/10 rounded-xl p-5">
            <p className="text-red-300 font-semibold text-sm uppercase tracking-wide mb-3">Bloqueadores & alertas</p>
            <p className="text-sm leading-relaxed">
              <span className="text-red-300">● B3</span> Exige seguradora rating ≥ A<br />
              <span className="text-yellow-400">● A5</span> Cláusula de renovação automática<br />
              <span className="text-yellow-400">● A8</span> Prazo de emissão: 5 dias úteis
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
