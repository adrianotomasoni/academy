# 04 — Ingestão da Base de Conhecimento (RAG)

A base de conhecimento em `packages/knowledge-base` alimenta o assistente IA (Módulo 3) e o motor de análise de contratos (Módulo 7). Este guia explica como transformá-la em embeddings no Supabase.

## Como funciona

```
Arquivos .md (knowledge-base)
        ↓
Script de ingestão (divide por ## em chunks)
        ↓
OpenAI embeddings (text-embedding-3-small, 1536 dimensões)
        ↓
Tabela documentos_kb (Supabase pgvector)
        ↓
Função buscar_conhecimento() → RAG no chat
```

## Pré-requisitos

- Schema já criado (migration 0007 — tabela `documentos_kb`).
- Variáveis no ambiente: `OPENAI_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`.

## Executar a ingestão

```bash
cd traderisk-academy
export OPENAI_API_KEY=sk-...
export SUPABASE_URL=https://...supabase.co
export SUPABASE_SERVICE_KEY=eyJ...

python scripts/ingest_knowledge_base.py \
  --path packages/knowledge-base/agente-seguro-garantia
```

O script percorre todos os `.md`, divide por seção (`##`), gera embeddings e insere. Saída esperada:

```
Encontrados 66 arquivos .md
  + 00_NUCLEO/system-prompt.md :: Identidade
  + 01_CONHECIMENTO_BASE/o-que-e-seguro-garantia.md :: Definição
  ...
Concluído: 312 chunks inseridos.
```

## Reingestão (após atualizar a KB)

Quando atualizar os arquivos `.md`, limpe e reingesta:

```sql
-- No SQL Editor do Supabase
TRUNCATE public.documentos_kb;
```

```bash
python scripts/ingest_knowledge_base.py --path packages/knowledge-base/agente-seguro-garantia
```

> Em produção, automatize isso com um GitHub Action que roda a cada merge na pasta knowledge-base.

## Testar o RAG

Após a ingestão, teste a busca semântica no SQL Editor:

```sql
-- Substitua pelo embedding de uma pergunta real (gerado via API)
SELECT titulo, subtitulo, conteudo
FROM documentos_kb
ORDER BY embedding <=> '[...]'::vector
LIMIT 5;
```

Ou via API: `POST /chat` com uma pergunta técnica e verifique se as fontes retornadas fazem sentido.

## Ajuste de qualidade

- **Threshold baixo demais** (muitos resultados irrelevantes): aumente `match_threshold` em `buscar_conhecimento` (0.75 → 0.80).
- **Threshold alto demais** (poucos resultados): reduza para 0.70.
- **Chunks grandes demais**: o script divide por `##`. Se um chunk passar de ~8000 caracteres, subdivida o arquivo `.md` com mais headings.
