# Traderisk Academy

Plataforma de inteligência em Seguro Garantia para corretores, empresas tomadoras e advogados.

`academy.traderisk.com.br`

---

## O que é

Plataforma que une educação técnica, inteligência de mercado, análise financeira e análise automatizada de contratos/editais em Seguro Garantia. Funciona como o principal ativo de geração de leads qualificados da Traderisk Capital & Insurance.

## Arquitetura do monorepo

```
traderisk-academy/
├── apps/
│   ├── web/                  → Frontend Next.js 14 (App Router + Tailwind)
│   └── api/                  → Backend FastAPI (Python 3.11)
├── packages/
│   └── knowledge-base/       → Base de conhecimento (.md) que alimenta o RAG
├── supabase/
│   └── migrations/           → Schema SQL (banco de dados)
├── scripts/                  → Ingestão da KB, utilitários
├── docs/                     → Tutoriais de setup e integração
└── .vscode/                  → Configuração do editor
```

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 14, Tailwind CSS, TypeScript |
| Backend | FastAPI, Python 3.11 |
| Banco | Supabase (PostgreSQL + pgvector + Storage + Auth) |
| IA | Claude API (Anthropic) + OpenAI embeddings |
| Pagamentos | Stripe |
| Deploy | Vercel (web) + Railway/Render (api) |

## Módulos

1. Tela inicial inteligente (CNPJ first)
2. Academia (educação)
3. Assistente IA (chat RAG)
4. Guia das seguradoras (linhas de corte)
5. Análise financeira do tomador
6. Pipeline de oportunidades judiciais
7. Análise de contratos e editais

## Começando

Leia os tutoriais na pasta `docs/` na ordem:

1. `docs/01-setup-local.md` — rodar o projeto localmente
2. `docs/02-supabase-setup.md` — configurar o banco
3. `docs/03-github-setup.md` — versionamento e CI
4. `docs/04-ingestao-knowledge-base.md` — alimentar o RAG
5. `docs/05-integracoes.md` — APIs externas
6. `docs/06-deploy.md` — colocar em produção
7. `docs/07-melhores-praticas.md` — padrões do projeto

## Quick start

```bash
# Backend
cd apps/api
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # preencher as chaves
uvicorn app.main:app --reload

# Frontend (outro terminal)
cd apps/web
npm install
cp .env.local.example .env.local   # preencher as chaves
npm run dev
```

Acesse `http://localhost:3000`.

## Licença

Proprietária — Traderisk Capital & Insurance.
