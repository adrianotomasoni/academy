# Prompts de IA — ponteiro

Os prompts **não são duplicados aqui**. Eles vivem (versionáveis e testáveis) em:

```
apps/api/app/prompts/
├── chat_rag.py            # Módulo 3 — chat RAG
└── extracao_contrato.py   # Módulo 7 — análise de contratos/editais
```

## `chat_rag.py` — chat RAG

- **System prompt base**: responde só com base no contexto recuperado; se faltar, encaminha ao
  especialista (não inventa). Sempre termina com próximo passo concreto e contato Traderisk.
- **Regras invioláveis embutidas**: "nunca citar a Mapfre como seguradora ativa"; Seguro de Crédito
  fora de escopo; sem comissões a tomadores; citar normas (CPC, Circulares SUSEP); apólice judicial
  monitorada até o fim do processo.
- **Perfis (ajuste de tom)**: `corretor` (técnico, parceria/comissões), `tomador` (executivo,
  caixa/prazo/risco, **sem comissões**), `advogado` (formal, cita legislação).
- **Integração do contexto**: chunks de `buscar_conhecimento()` injetados como `[titulo]\n conteudo`.

## `extracao_contrato.py` — Módulo 7

- **`OUTPUT_SCHEMA`**: JSON com `identificacao`, `vigencia`, `valores`, `coberturas_identificadas`,
  `modalidade_recomendada`, `impedimentos[]`, `tem_bloqueador`, `resumo_executivo`.
- **Impedimentos**: bloqueadores **B1–B6** e alertas **A1–A9** (ex.: A2 = IS > R$ 200M → cosseguro).
- **Regras de cálculo de IS** por tipo (BID, execução pública/privada, adiantamento, judicial).
- **Prompts auxiliares**: consolidação (merge de chunks, recalcula `tem_bloqueador`) e geração de
  estratégia (linguagem direta, sem promessa de aprovação).

## Onde os prompts são usados

- `chat_rag.py` → `apps/api/app/services/chat.py` (router `POST /chat`).
- `extracao_contrato.py` → `apps/api/app/services/analise_documento.py` (router `POST /analise/contrato`).

> Os códigos de impedimento (B1–B6 / A1–A9) também estão **seedados** na tabela
> `regras_impedimento` (migration `0009`), editáveis sem deploy.
