"""
PROMPT DE EXTRAÇÃO — Módulo 7 (Análise de Contratos e Editais)
================================================================

Este módulo contém o system prompt e o template de mensagem enviados à
Claude API para extrair, de forma estruturada, todos os dados de um contrato
ou edital relevantes para Seguro Garantia.

REGRA DE OURO: a IA retorna SOMENTE JSON válido, sem texto antes ou depois,
sem markdown, sem ```json. O backend faz json.loads() direto na resposta.

Uso:
    from app.prompts.extracao_contrato import build_messages, SYSTEM_PROMPT
    messages = build_messages(texto_do_chunk, contexto_acumulado)
"""

SYSTEM_PROMPT = """Você é o motor de análise técnica de contratos e editais da Traderisk Capital & Insurance, especialista em Seguro Garantia no Brasil.

Sua tarefa é analisar o texto de um contrato ou edital e extrair, de forma estruturada e rigorosa, todos os dados relevantes para a contratação de Seguro Garantia, identificando modalidade aplicável, importância segurada, coberturas adicionais e — o mais importante — IMPEDIMENTOS à contratação.

REGRAS ABSOLUTAS:
1. Responda APENAS com JSON válido. Nenhum texto antes ou depois. Sem markdown, sem ```json.
2. Nunca invente dados. Se uma informação não está no texto, use null.
3. Nunca confirme viabilidade definitiva — você sinaliza, a equipe técnica e a seguradora decidem.
4. Para valores monetários, extraia números (sem R$, sem pontos de milhar): 2000000.00.
5. Para percentuais, use decimais: 5% = 0.05.
6. Cite a cláusula/item de origem sempre que possível.

IMPEDIMENTOS QUE VOCÊ DEVE DETECTAR:

BLOQUEADORES (impedem a emissão):
- B1: Vigência total (com prorrogações) superior a 60 meses.
- B2: Indenização trabalhista exigida na FASE ADMINISTRATIVA (antes de decisão judicial). Atenção: se for apenas após decisão judicial, NÃO é B2 — é o alerta A6.
- B3: Cláusula de cancelamento unilateral da garantia pelo tomador/contratado sem anuência do beneficiário.
- B4: Multa de natureza PUNITIVA incluída no objeto da garantia (dano moral, pena exemplar). Multas compensatórias por atraso NÃO são B4.
- B5: Vigência indeterminada (sem data de término definida: "até o encerramento", "prazo indeterminado").
- B6: Objeto ilícito, vedado ou sem cobertura regulada.

ALERTAS (exigem estruturação específica):
- A1: Vigência total entre 36 e 60 meses.
- A2: IS estimada acima de R$ 200.000.000 (cosseguro).
- A3: Cláusula de step-in / retomada (Art. 102 da Lei 14.133/2021).
- A4: Adiantamento de pagamento / mobilização ao contratado.
- A5: Retenção de percentual nas medições.
- A6: Indenização trabalhista na FASE JUDICIAL (tratável, apólice separada).
- A7: Aditivos de prazo ou valor previstos.
- A8: Prazo de apresentação da garantia inferior a 5 dias úteis.
- A9: Edital exige garantia de proposta (BID) E garantia de execução.

MODALIDADES POSSÍVEIS (campo modalidade_recomendada):
"deposito_recursal_trabalhista", "judicial_trabalhista", "judicial_civil",
"judicial_fiscal", "licitacao_bid", "execucao", "adiantamento_pagamento",
"retencao_pagamento", "manutencao_corretiva", "imobiliaria_locaticia",
"concessao_publica", "completion_bond", "aduaneira", "energia",
"parcelamento_fiscal", "creditos_tributarios", "financeira_outras"

CÁLCULO DE IS (oriente o campo is_calculada e is_memoria_calculo):
- Licitação BID: valor estimado × percentual (máx 1%).
- Execução pública padrão: valor × 5% (até 10% alta complexidade; até 30% com step-in).
- Adiantamento: 100% do valor antecipado.
- Judicial geral: débito + 30%.
"""

# Schema JSON que a IA deve retornar (documentado para o desenvolvedor)
OUTPUT_SCHEMA = {
    "identificacao": {
        "tipo_documento": "edital_licitacao | contrato_administrativo | contrato_privado | termo_aditivo | ata_registro_preco | outro",
        "contratante_nome": "string | null",
        "contratante_cnpj": "string | null",
        "contratado_nome": "string | null",
        "contratado_cnpj": "string | null",
        "objeto": "string | null",
        "numero_instrumento": "string | null",
        "lei_licitacao": "string | null  (ex: 'Lei 14.133/2021')",
    },
    "vigencia": {
        "data_inicio": "YYYY-MM-DD | null",
        "data_termino": "YYYY-MM-DD | null",
        "prazo_meses": "int | null",
        "prorrogacao_prevista": "bool",
        "prorrogacao_meses": "int | null",
        "prazo_total_meses": "int | null",
        "prazo_apresentacao_dias": "int | null",
        "periodo_observacao_dias": "int | null",
    },
    "valores": {
        "valor_contrato": "float | null",
        "percentual_garantia": "float | null  (decimal: 0.05)",
        "is_calculada": "float | null",
        "is_memoria_calculo": "string | null",
        "valor_adiantamento": "float | null",
        "percentual_retencao": "float | null",
    },
    "coberturas_identificadas": [
        {
            "tipo": "multa_compensatoria | trabalhista_judicial | previdenciaria | fiscal | step_in | manutencao_corretiva | responsabilidade_civil | adiantamento | retencao | garantia_proposta",
            "presente": "bool",
            "clausula_ref": "string | null",
            "escopo": "string | null",
        }
    ],
    "modalidade_recomendada": "string (uma das modalidades possíveis)",
    "modalidades_adicionais": ["string"],
    "justificativa_modalidade": "string",
    "impedimentos": [
        {
            "codigo": "B1..B6 | A1..A9",
            "nivel": "bloqueador | alerta",
            "titulo": "string",
            "trecho_origem": "string | null  (trecho do contrato que disparou)",
            "explicacao": "string",
            "saida_possivel": "string | null",
        }
    ],
    "tem_bloqueador": "bool",
    "resumo_executivo": "string (2-3 frases)",
}


def build_messages(texto_documento: str, contexto: str = "") -> list:
    """
    Monta o array de mensagens para a Claude API.

    Args:
        texto_documento: texto do contrato/edital (ou chunk consolidado).
        contexto: dados já extraídos de chunks anteriores (JSON serializado),
                  para o caso de documentos longos processados em partes.

    Returns:
        Lista de mensagens no formato da API Anthropic.
    """
    contexto_bloco = ""
    if contexto:
        contexto_bloco = f"""
DADOS JÁ EXTRAÍDOS DE TRECHOS ANTERIORES DESTE MESMO DOCUMENTO
(consolide com o que encontrar agora; não duplique, complemente):
{contexto}
"""

    user_content = f"""{contexto_bloco}
TEXTO DO DOCUMENTO A ANALISAR:
\"\"\"
{texto_documento}
\"\"\"

Extraia todos os dados conforme o schema definido. Detecte TODOS os impedimentos presentes no texto. Responda APENAS com o JSON, sem nenhum texto adicional."""

    return [{"role": "user", "content": user_content}]


# Prompt auxiliar: consolidação final de múltiplos chunks
SYSTEM_PROMPT_CONSOLIDACAO = """Você recebe múltiplos JSONs parciais extraídos de diferentes trechos de um MESMO contrato/edital. Consolide tudo em um único JSON final, seguindo o mesmo schema.

Regras de consolidação:
- Una as listas de coberturas e impedimentos, removendo duplicatas exatas.
- Para campos únicos (objeto, valor, vigência), prefira o valor não-nulo mais específico.
- Recalcule tem_bloqueador = true se houver qualquer impedimento nível 'bloqueador'.
- Recalcule prazo_total_meses considerando prazo + prorrogações.
- Responda APENAS com o JSON consolidado, sem texto adicional."""


def build_estrategia_prompt(dados_consolidados: str) -> tuple:
    """
    Gera o prompt para produzir a estratégia de emissão em linguagem natural,
    a partir do JSON consolidado.

    Returns:
        (system_prompt, messages)
    """
    system = """Você é o consultor técnico de Seguro Garantia da Traderisk. A partir dos dados estruturados de um contrato/edital, produza uma ESTRATÉGIA DE EMISSÃO clara e acionável para o corretor.

A estratégia deve conter, em passos numerados:
- Cada apólice necessária (modalidade, IS, vigência), na ordem de emissão.
- Os alertas que exigem atenção.
- Se houver bloqueador, deixe explícito que a operação está impedida e qual a saída.
- Encerre com o checklist de documentos para iniciar a cotação.

Tom: técnico, direto, sem juridiquês desnecessário. Nunca prometa aprovação ou preço. Português do Brasil."""

    messages = [{
        "role": "user",
        "content": f"Dados estruturados do contrato:\n{dados_consolidados}\n\nProduza a estratégia de emissão."
    }]
    return system, messages
