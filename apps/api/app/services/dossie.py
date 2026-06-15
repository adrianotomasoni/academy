"""
Serviço de dossiê do tomador — consulta integrada por CNPJ.
Integra APIBrasil (cadastral), DataJud (processos) e PNCP (contratos).
As integrações reais ficam em integracoes/. Aqui é a orquestração.
"""
from app.core.supabase_client import get_supabase
from app.services.integracoes import apibrasil, datajud, pncp


def montar_dossie(cnpj: str, completo: bool = False) -> dict:
    """
    Monta o dossiê de um tomador.

    Args:
        cnpj: CNPJ limpo (somente dígitos).
        completo: se True, inclui dados Pro (detalhes de processos, contratos).
    """
    sb = get_supabase()
    cnpj = "".join(filter(str.isdigit, cnpj))

    # 1. Cadastral (sempre)
    cadastral = apibrasil.consultar_cnpj(cnpj)

    # 2. Processos judiciais (quantidade no free; detalhes no pro)
    processos = datajud.consultar_por_cnpj(cnpj, detalhado=completo)

    # 3. Contratos públicos (sim/não no free; detalhes no pro)
    contratos = pncp.consultar_por_cnpj(cnpj, detalhado=completo)

    # 4. Score de potencial
    score = _calcular_score(cadastral, processos, contratos)

    dossie = {
        "cnpj": cnpj,
        "cadastral": cadastral,
        "processos": processos if completo else {
            "trabalhista": processos.get("total_trabalhista", 0),
            "civel": processos.get("total_civel", 0),
            "fiscal": processos.get("total_fiscal", 0),
        },
        "contratos_publicos": contratos if completo else {
            "participa": contratos.get("total", 0) > 0,
        },
        "score_potencial": score,
    }
    return dossie


def _calcular_score(cadastral, processos, contratos) -> str:
    """Heurística simples de potencial para Seguro Garantia."""
    if cadastral.get("situacao") != "ATIVA":
        return "baixo"
    pontos = 0
    if contratos.get("total", 0) > 0:
        pontos += 2
    if processos.get("total_trabalhista", 0) > 5:
        pontos += 1
    if processos.get("total_fiscal", 0) > 0:
        pontos += 1
    return "alto" if pontos >= 3 else "medio" if pontos >= 1 else "baixo"
