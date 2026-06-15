const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function authHeaders(token?: string, json = false): Record<string, string> {
  const h: Record<string, string> = {};
  if (json) h["Content-Type"] = "application/json";
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}

/** Público: contagem de ações em curso (polo passivo) por esfera. Sem login. */
export async function contarProcessos(cnpj: string) {
  const r = await fetch(`${API_URL}/processos/${cnpj}`);
  if (!r.ok) throw new Error("Erro ao consultar processos");
  return r.json();
}

export async function consultarDossie(cnpj: string, token?: string) {
  const r = await fetch(`${API_URL}/dossie/${cnpj}`, { headers: authHeaders(token) });
  if (!r.ok) throw new Error("Erro ao consultar CNPJ");
  return r.json();
}

export async function perguntarChat(pergunta: string, token: string, historico = []) {
  const r = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: authHeaders(token, true),
    body: JSON.stringify({ pergunta, historico }),
  });
  if (r.status === 402) throw new Error("Limite de perguntas do plano gratuito atingido. Faça upgrade para o Pro.");
  if (!r.ok) throw new Error("Erro no chat");
  return r.json();
}

export async function filtrarSeguradoras(filtro: Record<string, unknown>, token?: string) {
  const r = await fetch(`${API_URL}/seguradoras/filtrar`, {
    method: "POST",
    headers: authHeaders(token, true),
    body: JSON.stringify(filtro),
  });
  if (!r.ok) throw new Error("Erro ao filtrar seguradoras");
  return r.json();
}

export async function analisarDocumento(arquivo: File, token: string) {
  const fd = new FormData();
  fd.append("arquivo", arquivo);
  const r = await fetch(`${API_URL}/analise`, {
    method: "POST",
    headers: authHeaders(token),
    body: fd,
  });
  if (r.status === 402) throw new Error("Limite de análises do plano gratuito atingido. Faça upgrade para o Pro.");
  if (!r.ok) throw new Error("Erro ao analisar documento");
  return r.json();
}
