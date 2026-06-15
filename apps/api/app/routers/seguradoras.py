from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.core.supabase_client import get_supabase
from app.core.auth import get_optional_user, eh_pro

router = APIRouter(prefix="/seguradoras", tags=["seguradoras"])


class FiltroRequest(BaseModel):
    modalidade_id: str
    pl: float | None = None
    faturamento: float | None = None
    is_pretendida: float | None = None
    tem_rj: bool = False
    eh_pf: bool = False
    anos_empresa: int = 5


@router.post("/filtrar")
def filtrar(req: FiltroRequest, user=Depends(get_optional_user)):
    """Filtra seguradoras por perfil do tomador. Linhas de corte detalhadas: Pro."""
    sb = get_supabase()
    res = sb.rpc("filtrar_seguradoras", {
        "p_modalidade_id": req.modalidade_id,
        "p_pl": req.pl,
        "p_faturamento": req.faturamento,
        "p_is_pretendida": req.is_pretendida,
        "p_tem_rj": req.tem_rj,
        "p_eh_pf": req.eh_pf,
        "p_anos_empresa": req.anos_empresa,
    }).execute()

    seguradoras = res.data or []
    if not eh_pro(user):
        # Free: oculta detalhes das linhas de corte
        for s in seguradoras:
            s.pop("motivo", None)
    return {"seguradoras": seguradoras, "pro": eh_pro(user)}
