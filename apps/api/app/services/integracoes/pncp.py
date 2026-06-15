"""Integração Portal Nacional de Compras Públicas (PNCP). Sem autenticação necessária."""
import logging
import httpx
from app.core.config import get_settings
from app.services.integracoes.base import consultar_com_fallback

settings = get_settings()
BASE_URL = "https://pncp.gov.br/api/pncp/v1"
logger = logging.getLogger(__name__)

TIMEOUT = 15
PAGE_SIZE = 20


def consultar_por_cnpj(cnpj: str, detalhado: bool = False) -> dict:
    """Consulta contratos públicos do fornecedor por CNPJ no PNCP."""
    cnpj_limpo = "".join(filter(str.isdigit, cnpj))
    return consultar_com_fallback(
        lambda: _buscar_contratos(cnpj_limpo, detalhado),
        lambda: _mock(cnpj_limpo, detalhado),
        fonte="PNCP",
        logger=logger,
    )


def _buscar_contratos(cnpj: str, detalhado: bool) -> dict:
    params = {
        "cnpjFornecedor": cnpj,
        "pagina": 1,
        "tamanhoPagina": PAGE_SIZE,
    }
    with httpx.Client(timeout=TIMEOUT) as client:
        r = client.get(f"{BASE_URL}/contratos", params=params)
        r.raise_for_status()
        data = r.json()

    total = data.get("totalRegistros", 0)
    resultado: dict = {"total": total, "valor_total": 0.0}

    if detalhado and data.get("data"):
        contratos = []
        valor_acumulado = 0.0
        for item in data["data"]:
            valor = float(item.get("valorInicial", 0) or 0)
            valor_acumulado += valor
            contratos.append({
                "orgao": item.get("nomeOrgao", ""),
                "valor": valor,
                "objeto": item.get("objetoContrato", ""),
                "status": item.get("situacaoContrato", {}).get("nome", ""),
                "data_assinatura": item.get("dataAssinatura", ""),
                "numero_pncp": item.get("numeroControlePNCP", ""),
            })
        resultado["contratos"] = contratos
        resultado["valor_total"] = valor_acumulado
    elif data.get("data"):
        resultado["valor_total"] = sum(
            float(item.get("valorInicial", 0) or 0)
            for item in data["data"]
        )

    return resultado


def _mock(cnpj: str, detalhado: bool) -> dict:
    base: dict = {"total": 8, "valor_total": 12400000.0, "_mock": True}
    if detalhado:
        base["contratos"] = [
            {
                "orgao": "Prefeitura de Blumenau",
                "valor": 2000000.0,
                "objeto": "Pavimentação Av. Brasil",
                "status": "ativo",
                "data_assinatura": "2024-03-15",
                "numero_pncp": "1234567890000-1-000001/2024",
            },
        ]
    return base
