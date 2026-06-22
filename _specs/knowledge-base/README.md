# Knowledge Base (RAG) — ponteiro

Os **66 arquivos `.md`** da base de conhecimento **não são duplicados aqui**. Eles vivem em:

```
packages/knowledge-base/agente-seguro-garantia/
├── 00_NUCLEO/                  system-prompt.md, glossario.md, limites-do-agente.md, regras-de-comportamento.md
├── 01_CONHECIMENTO_BASE/       o-que-e-seguro-garantia, analise-de-impedimentos, legislacao-e-normas,
│                               partes-da-apolice, sinistro-e-acionamento, subscricao-e-analise-de-risco,
│                               analise-de-contratos-editais-processos
├── 02_GRUPOS_DE_MODALIDADES/   tradicionais/ judiciais/ estruturadas/ financeiras/ (+ _TEMPLATE)
├── 03_PUBLICOS/                advogado-juridico, corretor-parceiro, empresa-licitante, tomador-empresa
├── 04_OPERACAO_TRADERISK/      motor-judicial-e-fluxos, portal-do-tomador, posicionamento-e-numeros, seguradoras-parceiras
├── 05_ARGUMENTOS_E_OBJECOES/   argumentos-por-publico, objecoes-e-respostas
├── 06_FAQ/                     faq-advogados, faq-corretores, faq-judicial, faq-tomadores
└── 07_INTEGRACOES/             README + apibrasil-cnpj/ + datajud/
```

## Entradas-chave

- **`00_NUCLEO/system-prompt.md`** — identidade e comportamento base do agente.
- **`01_CONHECIMENTO_BASE/analise-de-impedimentos.md`** — lógica de impedimentos (alinhada com os
  códigos B1–B6 / A1–A9 da tabela `regras_impedimento` e do prompt do Módulo 7).

## Pipeline de ingestão (RAG)

```
.md  →  chunking por "##"  →  embeddings OpenAI (text-embedding-3-small, 1536d)
     →  tabela documentos_kb (pgvector + índice HNSW)  →  busca via RPC buscar_conhecimento()
```

Executar:

```bash
export OPENAI_API_KEY=sk-...
export SUPABASE_URL=https://....supabase.co
export SUPABASE_SERVICE_KEY=eyJ...
python scripts/ingest_knowledge_base.py --path packages/knowledge-base/agente-seguro-garantia
```

Reingestão após editar a KB: `TRUNCATE documentos_kb;` e rodar o script de novo.

> Memo adicional (novo, ainda fora da KB canônica): `_specs/referencias/MEMORIA_MODALIDADES_SEGURO_GARANTIA.md`.
> Candidato a ser convertido em `.md` na KB e ingerido — não feito ainda.
