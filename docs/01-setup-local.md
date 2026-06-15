# 01 — Setup Local

Guia para rodar a plataforma na sua máquina pela primeira vez.

## Pré-requisitos

| Ferramenta | Versão | Verificar |
|---|---|---|
| Node.js | 18+ | `node -v` |
| Python | 3.11+ | `python --version` |
| Git | qualquer | `git --version` |
| VS Code | recomendado | — |

## Passo 1 — Clonar o repositório

```bash
git clone https://github.com/traderisk/traderisk-academy.git
cd traderisk-academy
```

## Passo 2 — Abrir no VS Code

```bash
code .
```

Ao abrir, o VS Code sugere instalar as extensões recomendadas (`.vscode/extensions.json`). Aceite — elas configuram Python, ESLint, Tailwind e Supabase.

## Passo 3 — Backend (FastAPI)

```bash
cd apps/api
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

Edite `.env` com suas chaves (veja `docs/02-supabase-setup.md` e `docs/05-integracoes.md`).

Rode:
```bash
uvicorn app.main:app --reload
```

A API sobe em `http://localhost:8000`. Documentação interativa automática em `http://localhost:8000/docs`.

## Passo 4 — Frontend (Next.js)

Em outro terminal:
```bash
cd apps/web
npm install
cp .env.local.example .env.local
```

Edite `.env.local` com a URL e a chave anônima do Supabase.

Rode:
```bash
npm run dev
```

Acesse `http://localhost:3000`.

## Passo 5 — Validar

- Frontend carrega a home com o campo de CNPJ.
- Digite um CNPJ qualquer (14 dígitos) e clique em Analisar.
- Sem credenciais reais, as integrações retornam dados de mock — isso é esperado em desenvolvimento.

## Rodando tudo com Docker (opcional)

```bash
docker-compose up
```

Sobe a API em container. O frontend continua via `npm run dev`.

## Debug no VS Code

Pressione F5 e escolha "API: FastAPI (uvicorn)". O breakpoint funciona direto no código Python.
