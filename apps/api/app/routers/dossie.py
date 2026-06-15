from fastapi import APIRouter, Depends
from app.services import dossie as dossie_service
from app.core.auth import get_optional_user, eh_pro

router = APIRouter(prefix="/dossie", tags=["dossie"])


@router.get("/{cnpj}")
def consultar(cnpj: str, user=Depends(get_optional_user)):
    """Dossiê por CNPJ. Sem login: versão básica. Pro: versão completa."""
    completo = eh_pro(user)
    return dossie_service.montar_dossie(cnpj, completo=completo)
