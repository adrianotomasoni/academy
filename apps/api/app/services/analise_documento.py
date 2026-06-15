"""
Serviço de análise de contratos e editais (Módulo 7).
Orquestra: extração de texto -> chunking -> IA -> consolidação -> estratégia.
"""
import json
from app.core.llm import chat_claude_json, chat_claude
from app.prompts.extracao_contrato import (
    SYSTEM_PROMPT, build_messages,
    SYSTEM_PROMPT_CONSOLIDACAO, build_estrategia_prompt,
)
from app.services.extrator_texto import extrair_texto, dividir_em_chunks


def analisar_documento(arquivo_path: str, arquivo_tipo: str) -> dict:
    """
    Pipeline completo de análise de um contrato/edital.

    Returns:
        dict no schema OUTPUT_SCHEMA + campo 'estrategia'.
    """
    # 1. Extrair texto (com OCR se necessário)
    texto, usou_ocr, n_paginas = extrair_texto(arquivo_path, arquivo_tipo)

    # 2. Dividir em chunks semânticos
    chunks = dividir_em_chunks(texto)

    # 3. Extrair de cada chunk, acumulando contexto
    parciais = []
    contexto = ""
    for chunk in chunks:
        messages = build_messages(chunk, contexto)
        parcial = chat_claude_json(SYSTEM_PROMPT, messages)
        parciais.append(parcial)
        # Mantém um contexto enxuto para o próximo chunk
        contexto = json.dumps({
            "identificacao": parcial.get("identificacao"),
            "modalidade_recomendada": parcial.get("modalidade_recomendada"),
        }, ensure_ascii=False)

    # 4. Consolidar (se houve mais de um chunk)
    if len(parciais) == 1:
        consolidado = parciais[0]
    else:
        msg = [{"role": "user", "content":
                "JSONs parciais para consolidar:\n" + json.dumps(parciais, ensure_ascii=False)}]
        consolidado = chat_claude_json(SYSTEM_PROMPT_CONSOLIDACAO, msg)

    # 5. Gerar estratégia em linguagem natural
    sys_estr, msg_estr = build_estrategia_prompt(json.dumps(consolidado, ensure_ascii=False))
    estrategia = chat_claude(sys_estr, msg_estr, max_tokens=1500)

    # 6. Montar resultado final
    consolidado["estrategia"] = estrategia
    consolidado["_meta"] = {
        "paginas": n_paginas,
        "ocr_usado": usou_ocr,
        "chunks": len(chunks),
    }
    return consolidado
