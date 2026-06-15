"""Integração DataJud (CNJ). Ver knowledge-base 07_INTEGRACOES/datajud."""
import httpx
from app.core.config import get_settings

settings = get_settings()


def consultar_por_cnpj(cnpj: str, detalhado: bool = False) -> dict:
    """
    Consulta processos por CNPJ.
    Nota: o DataJud busca por número de processo; a busca por parte/CNPJ
    exige estratégia de indexação própria ou uso do Escavador. Ver docs.
    """
    if not settings.datajud_api_key:
        return _mock(cnpj, detalhado)
    # TODO: implementar query Elasticsearch por documento da parte
    return _mock(cnpj, detalhado)


def _mock(cnpj: str, detalhado: bool) -> dict:
    base = {"total_trabalhista": 12, "total_civel": 3, "total_fiscal": 1}
    if detalhado:
        base["processos"] = [
            {"numero_cnj": "0001234-56.2024.5.12.0001", "tribunal": "TRT12",
             "fase": "recurso", "valor_causa": 85000.0, "polo_tomador": "passivo",
             "modalidade_provavel": "deposito_recursal_trabalhista"},
        ]
    return base
