"""Testes da integração BrasilAPI (consulta cadastral de CNPJ)."""
import httpx

from app.services.integracoes import apibrasil


def test_normalizar_mapeia_campos_principais():
    data = {
        "cnpj": "47960950000121",
        "razao_social": "Magazine Luiza S.A.",
        "descricao_situacao_cadastral": "Ativa",
        "cnae_fiscal_descricao": "Comércio varejista",
        "cnae_fiscal": 4759801,
        "porte": "DEMAIS",
        "capital_social": 1000.5,
    }
    out = apibrasil._normalizar(data)
    assert out["razao_social"] == "Magazine Luiza S.A."
    assert out["situacao"] == "ATIVA"  # normalizado p/ maiúsculas
    assert out["cnae_principal"] == "Comércio varejista"
    assert out["cnae_codigo"] == "4759801"
    assert out["capital_social"] == 1000.5


def test_consultar_cnpj_sucesso(monkeypatch):
    monkeypatch.setattr(
        apibrasil, "_buscar", lambda cnpj: {"razao_social": "X", "situacao": "ATIVA"}
    )
    res = apibrasil.consultar_cnpj("47.960.950/0001-21")
    assert res["razao_social"] == "X"
    assert "_mock" not in res


def test_consultar_cnpj_cai_no_mock_em_falha(monkeypatch):
    def boom(cnpj):
        raise httpx.ConnectError("down")

    monkeypatch.setattr(apibrasil, "_buscar", boom)
    res = apibrasil.consultar_cnpj("47960950000121")
    assert res["_mock"] is True
    assert res["situacao"] == "ATIVA"
