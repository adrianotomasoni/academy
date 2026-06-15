"""Testes da orquestração do dossiê do tomador."""
from app.services import dossie


def _patch(monkeypatch, cadastral, processos, contratos):
    monkeypatch.setattr(dossie, "get_supabase", lambda: None)
    monkeypatch.setattr(dossie.apibrasil, "consultar_cnpj", lambda c: cadastral)
    monkeypatch.setattr(
        dossie.datajud, "consultar_por_cnpj", lambda c, detalhado=False: processos
    )
    monkeypatch.setattr(
        dossie.pncp, "consultar_por_cnpj", lambda c, detalhado=False: contratos
    )


def test_montar_dossie_basico_normaliza_e_resume(monkeypatch):
    _patch(
        monkeypatch,
        {"razao_social": "X", "situacao": "ATIVA"},
        {"total_trabalhista": 12, "total_civel": 3, "total_fiscal": 1},
        {"total": 8},
    )
    d = dossie.montar_dossie("47.960.950/0001-21")
    assert d["cnpj"] == "47960950000121"
    assert d["processos"] == {"trabalhista": 12, "civel": 3, "fiscal": 1}
    assert d["contratos_publicos"] == {"participa": True}
    assert d["score_potencial"] == "alto"


def test_score_baixo_quando_empresa_inativa():
    assert dossie._calcular_score({"situacao": "BAIXADA"}, {}, {}) == "baixo"


def test_score_medio_com_um_ponto():
    score = dossie._calcular_score(
        {"situacao": "ATIVA"}, {"total_trabalhista": 10}, {"total": 0}
    )
    assert score == "medio"


def test_score_alto_com_tres_pontos():
    score = dossie._calcular_score(
        {"situacao": "ATIVA"},
        {"total_trabalhista": 10, "total_fiscal": 2},
        {"total": 5},
    )
    assert score == "alto"
