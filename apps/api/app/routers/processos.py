"""Consulta pública e enxuta de risco judicial — porta de entrada gratuita.

Retorna apenas a CONTAGEM de ações em curso (não encerradas) em que o CNPJ é
polo passivo, por esfera. É a versão limitada: assinantes acessam o detalhamento
completo (todas as partes, valores, modalidade provável, oportunidades) via /dossie.
"""
from fastapi import APIRouter

from app.services.integracoes import apibrasil, datajud

router = APIRouter(prefix="/processos", tags=["processos"])


@router.get("/{cnpj}")
def contar_processos(cnpj: str):
    cnpj_limpo = "".join(filter(str.isdigit, cnpj))
    counts = datajud.contar_polo_passivo(cnpj_limpo)
    cadastral = apibrasil.consultar_cnpj(cnpj_limpo)
    return {
        "cnpj": cnpj_limpo,
        "razao_social": cadastral.get("razao_social", ""),
        "trabalhista": counts.get("trabalhista", 0),
        "civel": counts.get("civel", 0),
        "fiscal": counts.get("fiscal", 0),
    }
