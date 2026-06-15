# 03 — Configuração do GitHub

Versionamento, colaboração e CI/CD.

## Passo 1 — Criar o repositório

1. Em [github.com](https://github.com), crie um repositório **privado**: `traderisk-academy`.
2. NÃO inicialize com README (já temos um).

## Passo 2 — Subir o código

Na raiz do projeto:

```bash
git init
git add .
git commit -m "chore: estrutura inicial da plataforma Traderisk Academy"
git branch -M main
git remote add origin https://github.com/traderisk/traderisk-academy.git
git push -u origin main
```

> O `.gitignore` já impede que `.env`, `node_modules` e `.venv` sejam enviados. Confirme que nenhum `.env` foi commitado: `git status` antes do push.

## Passo 3 — Proteger a branch main

Em **Settings → Branches → Add rule**:
- Branch name pattern: `main`
- Require a pull request before merging ✅
- Require status checks to pass ✅

## Passo 4 — Estrutura de branches

```
main          → produção (deploy automático)
develop       → integração
feature/*     → novas funcionalidades
fix/*         → correções
```

Fluxo: `feature/nome` → PR para `develop` → testes → PR para `main`.

## Passo 5 — Secrets do repositório

Em **Settings → Secrets and variables → Actions**, adicione os secrets para o CI/CD não depender de `.env` local:

```
SUPABASE_URL
SUPABASE_SERVICE_KEY
ANTHROPIC_API_KEY
OPENAI_API_KEY
VERCEL_TOKEN
```

## Passo 6 — CI básico (GitHub Actions)

O arquivo `.github/workflows/ci.yml` roda testes a cada push:

```yaml
name: CI
on: [push, pull_request]
jobs:
  api-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.11" }
      - run: pip install -r apps/api/requirements.txt
      - run: pytest apps/api/tests
  web-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "18" }
      - run: cd apps/web && npm ci && npm run build
```

## Passo 7 — Commits semânticos

Use o padrão Conventional Commits:

```
feat:     nova funcionalidade
fix:      correção de bug
docs:     documentação
refactor: refatoração sem mudança de comportamento
test:     testes
chore:    tarefas de manutenção
```

Exemplo: `feat(analise): adiciona detecção de cláusula step-in`
