from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from app.services import chat as chat_service
from app.core.auth import get_current_user, checar_limite_chat

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    pergunta: str
    historico: list = []


@router.post("")
def perguntar(req: ChatRequest, user=Depends(get_current_user)):
    checar_limite_chat(user)  # levanta 402 se free atingiu o limite
    perfil = user.get("perfil", "corretor")
    return chat_service.responder(req.pergunta, perfil, req.historico)
