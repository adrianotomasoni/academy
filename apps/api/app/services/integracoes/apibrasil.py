"""Integração BrasilAPI — dados cadastrais de CNPJ (Receita Federal).

Endpoint público: https://brasilapi.com.br/api/cnpj/v1/{cnpj} (sem autenticação).
Os tokens em config (apibrasil_token/apibrasil_device_token) ficam disponíveis
para um provedor pago alternativo no futuro, mas a BrasilAPI cobre o caso base
sem chave. Em qualquer indisponibilidade, cai num mock para não quebrar o dossiê.
"""
import logging

import httpx

from app.core.config import get_settings
from app.services.integracoes.base import consultar_com_fallback

settings = get_settings()
BASE_URL = "https://brasilapi.com.br/api/cnpj/v1"
logger = logging.getLogger(__name__)

TIMEOUT = 15


def consultar_cnpj(cnpj: str) -> dict:
    """Consulta dados cadastrais de um CNPJ. Cai em mock se indisponível."""
    cnpj_limpo = "".join(filter(str.isdigit, cnpj))
    return consultar_com_fallback(
        lambda: _buscar(cnpj_limpo),
        lambda: _mock(cnpj_limpo),
        fonte="BrasilAPI",
        logger=logger,
    )


def _buscar(cnpj: str) -> dict:
    with httpx.Client(timeout=TIMEOUT) as client:
        r = client.get(f"{BASE_URL}/{cnpj}")
        r.raise_for_status()
        data = r.json()
    return _normalizar(data)


def _normalizar(data: dict) -> dict:
    """Mapeia a resposta da BrasilAPI para o contrato esperado pelo dossiê."""
    return {
        "cnpj": data.get("cnpj", ""),
        "razao_social": data.get("razao_social", ""),
        "nome_fantasia": data.get("nome_fantasia", ""),
        # _calcular_score compara com "ATIVA" — normaliza para maiúsculas.
        "situacao": (data.get("descricao_situacao_cadastral") or "").upper(),
        "cnae_principal": data.get("cnae_fiscal_descricao", ""),
        "cnae_codigo": str(data.get("cnae_fiscal", "") or ""),
        "porte": data.get("porte", ""),
        "natureza_juridica": data.get("natureza_juridica", ""),
        "municipio": data.get("municipio", ""),
        "uf": data.get("uf", ""),
        "capital_social": float(data.get("capital_social", 0) or 0),
        "data_inicio_atividade": data.get("data_inicio_atividade", ""),
    }


def _mock(cnpj: str) -> dict:
    return {
        "cnpj": cnpj,
        "razao_social": "Empresa Demonstração Ltda",
        "nome_fantasia": "Demo Construções",
        "situacao": "ATIVA",
        "cnae_principal": "Construção de edifícios",
        "cnae_codigo": "4120400",
        "porte": "DEMAIS",
        "natureza_juridica": "206-2 - Sociedade Empresária Limitada",
        "municipio": "BLUMENAU",
        "uf": "SC",
        "capital_social": 5000000.0,
        "data_inicio_atividade": "2012-05-10",
        "_mock": True,
    }
