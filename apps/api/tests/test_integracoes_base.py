"""Testes do helper de fallback compartilhado das integrações."""
import httpx

from app.services.integracoes.base import consultar_com_fallback

REAL = {"ok": True}
MOCK = {"mock": True}


def test_retorna_resultado_real_quando_sucesso():
    res = consultar_com_fallback(lambda: REAL, lambda: MOCK, fonte="X")
    assert res == REAL


def test_cai_no_mock_em_timeout():
    def boom():
        raise httpx.TimeoutException("slow")

    assert consultar_com_fallback(boom, lambda: MOCK, fonte="X") == MOCK


def test_cai_no_mock_em_erro_de_conexao():
    def boom():
        raise httpx.ConnectError("down")

    assert consultar_com_fallback(boom, lambda: MOCK, fonte="X") == MOCK


def test_cai_no_mock_em_http_status_auth():
    req = httpx.Request("GET", "http://x")
    resp = httpx.Response(401, request=req)

    def boom():
        raise httpx.HTTPStatusError("auth", request=req, response=resp)

    assert consultar_com_fallback(boom, lambda: MOCK, fonte="X") == MOCK


def test_cai_no_mock_em_excecao_generica():
    def boom():
        raise ValueError("parse falhou")

    assert consultar_com_fallback(boom, lambda: MOCK, fonte="X") == MOCK
