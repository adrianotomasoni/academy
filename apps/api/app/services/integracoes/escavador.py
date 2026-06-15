"""
Integração Escavador V2 — monitoramento de movimentações processuais.
Docs: https://api.escavador.com/v2/docs/
Token obtido em: escavador.com → API → Chave de Acesso (Bearer PAT).
Custo: cobrado por crédito — acionar só quando há nova movimentação relevante.
"""
import logging
import httpx
from app.core.config import get_settings

settings = get_settings()
BASE_URL = "https://api.escavador.com/api/v2"
logger = logging.getLogger(__name__)

TIMEOUT = 20


def consultar_processos_por_cnpj(cnpj: str) -> dict:
    """
    Retorna processos nos quais o CNPJ figura como parte envolvida.
    Sem token retorna mock; com token faz a busca real.
    """
    if not settings.escavador_token:
        return _mock_processos(cnpj)
    cnpj_limpo = "".join(filter(str.isdigit, cnpj))
    try:
        return _buscar_envolvido(cnpj_limpo)
    except Exception as exc:
        logger.warning("Escavador indisponível (%s) — retornando mock", exc)
        return _mock_processos(cnpj_limpo)


def consultar_movimentacoes(processo_id: int) -> dict:
    """
    Retorna movimentações recentes de um processo pelo ID interno do Escavador.
    """
    if not settings.escavador_token:
        return _mock_movimentacoes(str(processo_id))
    try:
        return _buscar_movimentacoes(processo_id)
    except Exception as exc:
        logger.warning("Escavador movimentações falhou (%s) — retornando mock", exc)
        return _mock_movimentacoes(str(processo_id))


def criar_monitoramento(processo_id: int) -> dict:
    """Cadastra um processo para monitoramento contínuo."""
    if not settings.escavador_token:
        return {"monitorado": False, "_mock": True}
    try:
        with httpx.Client(timeout=TIMEOUT) as client:
            r = client.post(
                f"{BASE_URL}/monitoramentos",
                headers=_headers(),
                json={"processo_id": processo_id},
            )
            r.raise_for_status()
            return {"monitorado": True, **r.json()}
    except Exception as exc:
        logger.warning("Escavador criar_monitoramento falhou: %s", exc)
        return {"monitorado": False, "erro": str(exc)}


def _headers() -> dict:
    return {
        "Authorization": f"Bearer {settings.escavador_token}",
        "Accept": "application/json",
    }


def _buscar_envolvido(cnpj: str) -> dict:
    with httpx.Client(timeout=TIMEOUT) as client:
        r = client.get(
            f"{BASE_URL}/processos-envolvido",
            headers=_headers(),
            params={"cpf_cnpj": cnpj},
        )
        r.raise_for_status()
        data = r.json()

    items = data.get("items", [])
    return {
        "total": data.get("total", len(items)),
        "processos": [_normalizar(p) for p in items[:20]],
    }


def _buscar_movimentacoes(processo_id: int) -> dict:
    with httpx.Client(timeout=TIMEOUT) as client:
        r = client.get(
            f"{BASE_URL}/movimentacoes/{processo_id}",
            headers=_headers(),
        )
        r.raise_for_status()
        data = r.json()

    return {
        "processo_id": processo_id,
        "movimentacoes": data.get("items", []),
        "ultima_atualizacao": data.get("ultima_atualizacao", ""),
    }


def _normalizar(p: dict) -> dict:
    tribunal = p.get("tribunal", {})
    return {
        "id": p.get("id"),
        "numero_cnj": p.get("numero_cnj", ""),
        "tribunal": tribunal.get("sigla", "") if isinstance(tribunal, dict) else str(tribunal),
        "data_inicio": p.get("data_inicio", ""),
        "valor_causa": float(p.get("valor_causa", 0) or 0),
        "polo": p.get("polo_do_envolvido", ""),
    }


def _mock_processos(cnpj: str) -> dict:
    return {
        "total": 5,
        "processos": [
            {
                "id": 12345,
                "numero_cnj": "0001234-56.2024.5.12.0001",
                "tribunal": "TRT12",
                "data_inicio": "2024-01-10",
                "valor_causa": 85000.0,
                "polo": "passivo",
            },
        ],
        "_mock": True,
    }


def _mock_movimentacoes(processo_id: str) -> dict:
    return {
        "processo_id": processo_id,
        "movimentacoes": [
            {"data": "2024-11-20", "descricao": "Publicação de acórdão — TRT12"},
            {"data": "2024-10-05", "descricao": "Interposição de recurso ordinário"},
        ],
        "ultima_atualizacao": "2024-11-20",
        "_mock": True,
    }
