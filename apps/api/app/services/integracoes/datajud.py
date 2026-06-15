"""
Integração DataJud (CNJ) — busca de processos por CNPJ via Elasticsearch.
Ver knowledge-base/07_INTEGRACOES/datajud/ para mapeamento de TPUs.

Estratégia: o DataJud busca por campo `partes.vinculoDocumento` (CPF/CNPJ da parte).
Como o índice é por tribunal, consultamos um conjunto de tribunais relevantes em paralelo.
Tribunais incluídos: TRT 1-24 (trabalhista) + maiores TJs estaduais (cível/fiscal).
"""
import logging
import httpx
from app.core.config import get_settings
from app.services.integracoes.base import consultar_com_fallback

settings = get_settings()
BASE_URL = "https://api-publica.datajud.cnj.jus.br"
logger = logging.getLogger(__name__)

TIMEOUT = 20
PAGE_SIZE = 10

# Tribunais trabalhistas relevantes para garantia judicial (deposito recursal)
TRIBUNAIS_TRABALHISTA = [f"trt{i}" for i in range(1, 25)]

# Principais TJs para processos cível e fiscal
TRIBUNAIS_ESTADUAIS = ["tjsp", "tjrj", "tjmg", "tjpr", "tjrs", "tjsc", "tjba", "tjgo"]


def consultar_por_cnpj(cnpj: str, detalhado: bool = False) -> dict:
    """
    Consulta processos em que o CNPJ figura como parte.
    Sem chave a função retorna mock. Com chave, faz a busca real nos tribunais.
    """
    if not settings.datajud_api_key:
        return _mock(cnpj, detalhado)

    cnpj_limpo = "".join(filter(str.isdigit, cnpj))
    return consultar_com_fallback(
        lambda: _buscar_todos_tribunais(cnpj_limpo, detalhado),
        lambda: _mock(cnpj_limpo, detalhado),
        fonte="DataJud",
        logger=logger,
    )


def _buscar_tribunal(client: httpx.Client, tribunal: str, cnpj: str, detalhado: bool) -> list[dict]:
    """Faz a busca Elasticsearch em um único tribunal."""
    url = f"{BASE_URL}/api_publica_{tribunal}/_search"
    body = {
        "query": {
            "nested": {
                "path": "partes",
                "query": {
                    "match": {"partes.vinculoDocumento": cnpj}
                },
            }
        },
        "size": PAGE_SIZE,
        "_source": ["numeroProcesso", "tribunal", "classeProcessual", "assuntos",
                    "partes", "dataDistribuicao", "valorCausa"],
    }
    try:
        r = client.post(url, json=body,
                        headers={"Authorization": f"ApiKey {settings.datajud_api_key}"},
                        timeout=TIMEOUT)
        if r.status_code == 404:
            return []
        r.raise_for_status()
        hits = r.json().get("hits", {}).get("hits", [])
        return [h["_source"] for h in hits]
    except httpx.HTTPStatusError:
        return []


def _buscar_todos_tribunais(cnpj: str, detalhado: bool) -> dict:
    processos_trabalhista: list[dict] = []
    processos_civel: list[dict] = []
    processos_fiscal: list[dict] = []

    todos_tribunais = TRIBUNAIS_TRABALHISTA + TRIBUNAIS_ESTADUAIS

    with httpx.Client() as client:
        for tribunal in todos_tribunais:
            processos = _buscar_tribunal(client, tribunal, cnpj, detalhado)
            for p in processos:
                classe = (p.get("classeProcessual", {}) or {}).get("nome", "").lower()
                if "trabalhista" in classe or tribunal.startswith("trt"):
                    processos_trabalhista.append(p)
                elif "execução fiscal" in classe or "tributário" in classe:
                    processos_fiscal.append(p)
                else:
                    processos_civel.append(p)

    resultado: dict = {
        "total_trabalhista": len(processos_trabalhista),
        "total_civel": len(processos_civel),
        "total_fiscal": len(processos_fiscal),
    }

    if detalhado:
        resultado["processos"] = [
            _normalizar_processo(p, "trabalhista") for p in processos_trabalhista[:5]
        ] + [
            _normalizar_processo(p, "civel") for p in processos_civel[:3]
        ] + [
            _normalizar_processo(p, "fiscal") for p in processos_fiscal[:2]
        ]

    return resultado


def contar_polo_passivo(cnpj: str) -> dict:
    """Público (versão limitada): conta ações EM CURSO (não encerradas) em que o
    CNPJ figura como **polo passivo**, agrupadas por esfera (trabalhista/cível/fiscal).

    É de propósito mais pobre que ``consultar_por_cnpj(detalhado=True)``: assinantes
    acessam todas as partes, valores, modalidade provável e detalhe por processo.
    """
    cnpj_limpo = "".join(filter(str.isdigit, cnpj))
    if not settings.datajud_api_key:
        return _mock_polo_passivo(cnpj_limpo)
    return consultar_com_fallback(
        lambda: _contar_passivo(cnpj_limpo),
        lambda: _mock_polo_passivo(cnpj_limpo),
        fonte="DataJud",
        logger=logger,
    )


def _eh_polo_passivo(raw: dict, cnpj: str) -> bool:
    for parte in raw.get("partes", []) or []:
        if not isinstance(parte, dict):
            continue
        doc = "".join(filter(str.isdigit, parte.get("vinculoDocumento", "") or ""))
        if doc == cnpj:
            return "passiv" in (parte.get("polo", "") or "").lower()
    return False


def _esta_em_curso(raw: dict) -> bool:
    # O índice público não traz um marcador de baixa confiável; assume em curso.
    # TODO: refinar com situação/movimentações quando a fonte expuser o status.
    return True


def _contar_passivo(cnpj: str) -> dict:
    counts = {"trabalhista": 0, "civel": 0, "fiscal": 0}
    with httpx.Client() as client:
        for tribunal in TRIBUNAIS_TRABALHISTA + TRIBUNAIS_ESTADUAIS:
            for p in _buscar_tribunal(client, tribunal, cnpj, True):
                if not (_eh_polo_passivo(p, cnpj) and _esta_em_curso(p)):
                    continue
                classe = (p.get("classeProcessual", {}) or {}).get("nome", "").lower()
                if "trabalhista" in classe or tribunal.startswith("trt"):
                    counts["trabalhista"] += 1
                elif "fiscal" in classe or "tributár" in classe:
                    counts["fiscal"] += 1
                else:
                    counts["civel"] += 1
    return counts


def _mock_polo_passivo(cnpj: str) -> dict:
    return {"trabalhista": 9, "civel": 2, "fiscal": 1, "_mock": True}


def _normalizar_processo(raw: dict, tipo: str) -> dict:
    partes = raw.get("partes", []) or []
    polo_tomador = "nao_identificado"
    for parte in partes:
        if isinstance(parte, dict) and parte.get("vinculoDocumento", "").replace(".", "").replace("/", "").replace("-", "") == raw.get("_cnpj_busca", ""):
            polo_tomador = "ativo" if "Ativo" in parte.get("polo", "") else "passivo"
            break

    return {
        "numero_cnj": raw.get("numeroProcesso", ""),
        "tribunal": raw.get("tribunal", ""),
        "tipo": tipo,
        "fase": raw.get("classeProcessual", {}).get("nome", "") if isinstance(raw.get("classeProcessual"), dict) else "",
        "valor_causa": float(raw.get("valorCausa", 0) or 0),
        "polo_tomador": polo_tomador,
        "modalidade_provavel": _inferir_modalidade(tipo, polo_tomador),
    }


def _inferir_modalidade(tipo: str, polo: str) -> str:
    if tipo == "trabalhista" and polo == "passivo":
        return "deposito_recursal_trabalhista"
    if tipo == "fiscal":
        return "deposito_judicial_fiscal"
    if tipo == "civel" and polo == "passivo":
        return "deposito_judicial_civel"
    return ""


def _mock(cnpj: str, detalhado: bool) -> dict:
    base: dict = {
        "total_trabalhista": 12,
        "total_civel": 3,
        "total_fiscal": 1,
        "_mock": True,
    }
    if detalhado:
        base["processos"] = [
            {
                "numero_cnj": "0001234-56.2024.5.12.0001",
                "tribunal": "TRT12",
                "tipo": "trabalhista",
                "fase": "recurso",
                "valor_causa": 85000.0,
                "polo_tomador": "passivo",
                "modalidade_provavel": "deposito_recursal_trabalhista",
            },
        ]
    return base
