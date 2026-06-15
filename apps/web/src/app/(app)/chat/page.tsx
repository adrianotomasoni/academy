"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { perguntarChat } from "@/lib/api";
import { getToken } from "@/lib/session";

type Msg = { autor: "user" | "ia"; texto: string; fontes?: { titulo: string }[] };

export default function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function enviar() {
    const pergunta = texto.trim();
    if (!pergunta) return;
    setErro("");
    setTexto("");
    setMsgs((m) => [...m, { autor: "user", texto: pergunta }]);
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) throw new Error("Sessão expirada. Entre novamente.");
      const r = await perguntarChat(pergunta, token);
      setMsgs((m) => [...m, { autor: "ia", texto: r.resposta, fontes: r.fontes }]);
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl flex flex-col h-[calc(100vh-3.5rem)]">
      <h1 className="text-2xl font-bold mb-1">Chat IA</h1>
      <p className="text-gray-300 mb-5">Agente especialista em Seguro Garantia, com fontes da base de conhecimento.</p>

      <div className="flex-1 overflow-auto space-y-3 pr-1">
        {msgs.length === 0 && (
          <p className="text-gray-400 text-sm">Pergunte sobre modalidades, editais, sinistro, legislação…</p>
        )}
        {msgs.map((m, i) =>
          m.autor === "user" ? (
            <div key={i} className="self-end ml-auto max-w-[78%] bg-teal text-navy px-4 py-2.5 rounded-2xl rounded-br-sm w-fit">
              {m.texto}
            </div>
          ) : (
            <div key={i} className="max-w-[88%] bg-white/10 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm">
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.texto}</p>
              {m.fontes && m.fontes.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {m.fontes.map((f, j) => (
                    <span key={j} className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                      {f.titulo}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        )}
        {loading && <p className="text-gray-400 text-sm">Pensando…</p>}
      </div>

      {erro && <p className="text-red-300 text-sm mt-2">{erro}</p>}

      <div className="flex gap-2 mt-3">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviar()}
          placeholder="Pergunte ao especialista…"
          className="flex-1 px-4 py-3 rounded-lg text-navy outline-none"
        />
        <button onClick={enviar} disabled={loading} className="px-4 bg-teal hover:bg-teal-light rounded-lg disabled:opacity-50">
          <Send size={18} className="text-navy" />
        </button>
      </div>
    </div>
  );
}
