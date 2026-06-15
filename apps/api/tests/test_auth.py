"""Testes dos limites de plano (chat e análise)."""
import pytest
from fastapi import HTTPException

from app.core import auth


def test_chat_bloqueia_no_limite():
    with pytest.raises(HTTPException) as exc:
        auth.checar_limite_chat({"plano": "free", "perguntas_ia_mes": 10})
    assert exc.value.status_code == 402


def test_chat_permite_abaixo_do_limite():
    auth.checar_limite_chat({"plano": "free", "perguntas_ia_mes": 3})


def test_analise_bloqueia_no_limite():
    with pytest.raises(HTTPException) as exc:
        auth.checar_limite_analise({"plano": "free", "analises_mes": 3})
    assert exc.value.status_code == 402


def test_analise_permite_abaixo_do_limite():
    auth.checar_limite_analise({"plano": "free", "analises_mes": 1})


def test_pro_ignora_ambos_os_limites():
    user = {"plano": "pro_corretor", "perguntas_ia_mes": 999, "analises_mes": 999}
    auth.checar_limite_chat(user)
    auth.checar_limite_analise(user)
