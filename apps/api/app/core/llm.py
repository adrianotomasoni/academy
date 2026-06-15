"""Wrappers para Claude (Anthropic) e embeddings (OpenAI)."""
import json
import anthropic
from openai import OpenAI
from app.core.config import get_settings

settings = get_settings()
_anthropic = anthropic.Anthropic(api_key=settings.anthropic_api_key)
_openai = OpenAI(api_key=settings.openai_api_key)


def chat_claude(system: str, messages: list, max_tokens: int = 2048) -> str:
    """Chamada simples ao Claude, retorna o texto concatenado."""
    resp = _anthropic.messages.create(
        model=settings.claude_model,
        max_tokens=max_tokens,
        system=system,
        messages=messages,
    )
    return "".join(block.text for block in resp.content if block.type == "text")


def chat_claude_json(system: str, messages: list, max_tokens: int = 4096) -> dict:
    """Chamada ao Claude esperando JSON puro na resposta."""
    raw = chat_claude(system, messages, max_tokens)
    # Remove cercas de markdown se a IA insistir em colocá-las
    raw = raw.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
    return json.loads(raw)


def gerar_embedding(texto: str) -> list[float]:
    """Gera embedding de um texto via OpenAI."""
    resp = _openai.embeddings.create(
        model=settings.embedding_model,
        input=texto,
    )
    return resp.data[0].embedding
