const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function consultarDossie(cnpj: string, token?: string) {
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const r = await fetch(`${API_URL}/dossie/${cnpj}`, { headers });
  if (!r.ok) throw new Error("Erro ao consultar CNPJ");
  return r.json();
}

export async function perguntarChat(pergunta: string, token: string, historico = []) {
  const r = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ pergunta, historico }),
  });
  if (!r.ok) throw new Error("Erro no chat");
  return r.json();
}
