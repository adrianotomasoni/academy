"""Integração APIBrasil — consulta cadastral de CNPJ. Ver docs/05-integracoes.md."""
import httpx
from app.core.config import get_settings

settings = get_settings()
BASE_URL = "https://gateway.apibrasil.io/api/v2"


def consultar_cnpj(cnpj: str) -> dict:
    """Consulta dados cadastrais. Cacheamento em banco (30 dias) deve envolver esta chamada."""
    if not settings.apibrasil_token:
        return _mock_cnpj(cnpj)
    headers = {
        "Authorization": f"Bearer {settings.apibrasil_token}",
        "DeviceToken": settings.apibrasil_device_token,
    }
    with httpx.Client(timeout=20) as client:
        r = client.post(f"{BASE_URL}/dados/cnpj", json={"cnpj": cnpj}, headers=headers)
        r.raise_for_status()
        data = r.json()
    return _normalizar(data)


def _normalizar(data: dict) -> dict:
    """Normaliza a resposta da APIBrasil para o schema interno."""
    # TODO: mapear campos reais da resposta
    return data


def _mock_cnpj(cnpj: str) -> dict:
    """Mock para desenvolvimento sem credenciais."""
    return {
        "cnpj": cnpj, "razao_social": "EMPRESA EXEMPLO LTDA",
        "situacao": "ATIVA", "cnae_principal": "4120-4/00",
        "porte": "MEDIO", "capital_social": 5000000.0,
        "_mock": True,
    }
