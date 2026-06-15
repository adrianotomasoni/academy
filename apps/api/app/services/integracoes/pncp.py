"""Integração Portal Nacional de Compras Públicas (PNCP)."""
import httpx
from app.core.config import get_settings

settings = get_settings()
BASE_URL = "https://pncp.gov.br/api/pncp/v1"


def consultar_por_cnpj(cnpj: str, detalhado: bool = False) -> dict:
    """Consulta contratos públicos do fornecedor por CNPJ."""
    # TODO: implementar chamada real ao PNCP
    return _mock(cnpj, detalhado)


def _mock(cnpj: str, detalhado: bool) -> dict:
    base = {"total": 8, "valor_total": 12400000.0}
    if detalhado:
        base["contratos"] = [
            {"orgao": "Prefeitura de Blumenau", "valor": 2000000.0,
             "objeto": "Pavimentação", "status": "ativo"},
        ]
    return base
