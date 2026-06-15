"""Autenticação via JWT do Supabase e checagem de limites de plano."""
from fastapi import Depends, HTTPException, Header
from app.core.supabase_client import get_supabase
from app.core.config import get_settings

settings = get_settings()


def get_current_user(authorization: str = Header(None)) -> dict:
    """Valida o JWT do Supabase e retorna o usuário. Obrigatório."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(401, "Token ausente.")
    token = authorization.split(" ", 1)[1]
    sb = get_supabase()
    try:
        user = sb.auth.get_user(token).user
    except Exception:
        raise HTTPException(401, "Token inválido.")
    # Busca o perfil estendido
    perfil = sb.table("usuarios").select("*").eq("id", user.id).single().execute()
    return perfil.data


def get_optional_user(authorization: str = Header(None)) -> dict | None:
    """Versão opcional — retorna None se não autenticado."""
    if not authorization:
        return None
    try:
        return get_current_user(authorization)
    except HTTPException:
        return None


def eh_pro(user: dict | None) -> bool:
    return bool(user) and user.get("plano", "free") in ("pro_corretor", "pro_tomador")


def checar_limite_chat(user: dict):
    if eh_pro(user):
        return
    if user.get("perguntas_ia_mes", 0) >= settings.free_chat_limit:
        raise HTTPException(402, "Limite de perguntas do plano gratuito atingido. Faça upgrade para o Pro.")


def checar_limite_analise(user: dict):
    if eh_pro(user):
        return
    # Implementar contagem mensal de análises no banco
    pass
