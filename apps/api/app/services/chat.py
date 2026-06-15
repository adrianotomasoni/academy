"""Serviço de chat RAG — busca semântica + Claude."""
from app.core.llm import gerar_embedding, chat_claude
from app.core.supabase_client import get_supabase
from app.prompts.chat_rag import build_system_prompt


def responder(pergunta: str, perfil: str, historico: list = None) -> dict:
    """
    Responde uma pergunta usando RAG.

    Returns: {"resposta": str, "fontes": list}
    """
    sb = get_supabase()

    # 1. Embedding da pergunta
    emb = gerar_embedding(pergunta)

    # 2. Busca semântica (função SQL buscar_conhecimento)
    res = sb.rpc("buscar_conhecimento", {
        "query_embedding": emb,
        "match_threshold": 0.75,
        "match_count": 8,
    }).execute()

    chunks = res.data or []
    contexto = "\n\n---\n\n".join(
        f"[{c['titulo']}]\n{c['conteudo']}" for c in chunks
    )

    # 3. Monta prompt e chama Claude
    system = build_system_prompt(perfil, contexto)
    messages = (historico or []) + [{"role": "user", "content": pergunta}]
    resposta = chat_claude(system, messages, max_tokens=1500)

    return {
        "resposta": resposta,
        "fontes": [{"titulo": c["titulo"], "grupo": c["grupo"]} for c in chunks],
    }
