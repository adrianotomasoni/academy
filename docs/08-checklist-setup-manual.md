# Checklist de Setup Manual — Traderisk Academy

Este documento lista **exclusivamente** as etapas que exigem ação humana (criação de contas, inserção de credenciais, configurações via dashboard, DNS). Tudo que pode ser executado pelo Claude Code ou por linha de comando já está automatizado.

---

## 1. Supabase

### 1.1 Criar o projeto
1. Acesse [supabase.com](https://supabase.com) e faça login (ou crie conta).
2. Clique em **New Project**.
3. Nome: `traderisk-academy`.
4. Região: **South America (São Paulo)**.
5. Defina e guarde a **senha do banco** (você precisará dela se usar o CLI).
6. Aguarde o provisionamento (~2 min).

### 1.2 Copiar credenciais
Acesse **Settings → API** e copie:

| Variável | Onde copiar |
|---|---|
| `SUPABASE_URL` | Project URL |
| `SUPABASE_ANON_KEY` | `anon` `public` |
| `SUPABASE_SERVICE_KEY` | `service_role` (⚠️ nunca expor) |

Cole no arquivo `apps/api/.env` e no `apps/web/.env.local`.

### 1.3 Habilitar extensões (SQL Editor)
No dashboard, abra **SQL Editor** e execute:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

### 1.4 Aplicar as migrations
```bash
npm install -g supabase
supabase login
supabase link --project-ref SEU_PROJECT_REF   # ref: Settings → General
supabase db push
```
> O `PROJECT_REF` aparece na URL do projeto: `https://app.supabase.com/project/SEU_PROJECT_REF`.

### 1.5 Configurar autenticação
Em **Authentication → Providers**:
- Ative **Email** (obrigatório).
- Opcional: ative **Google** e/ou **Microsoft** com as respectivas credenciais OAuth.

Em **Authentication → URL Configuration**:
- Site URL: `https://academy.traderisk.com.br`
- Redirect URLs: adicione `http://localhost:3000/**` e `https://academy.traderisk.com.br/**`

### 1.6 Criar buckets de Storage
Em **Storage → New bucket**, crie:
- `documentos` — privado
- `condicoes-gerais` — privado

---

## 2. Anthropic (Claude)

1. Acesse [console.anthropic.com](https://console.anthropic.com).
2. Crie uma conta ou faça login.
3. Vá em **API Keys → Create Key**.
4. Copie a chave e coloque em `ANTHROPIC_API_KEY` no `.env` do backend.
5. Defina limite de gasto mensal em **Billing → Spend Limits** (recomendado: R$ 500 para começar).

---

## 3. OpenAI (Embeddings)

1. Acesse [platform.openai.com](https://platform.openai.com).
2. Crie conta ou faça login.
3. Vá em **API keys → Create new secret key**.
4. Copie e coloque em `OPENAI_API_KEY` no `.env` do backend.
5. Configure limite em **Settings → Limits** (embeddings são baratos: ~U$ 0,02/1M tokens).

---

## 4. APIBrasil (CNPJ)

1. Acesse [apibrasil.com.br](https://apibrasil.com.br) e crie conta.
2. No painel, vá em **Dispositivos → Novo Dispositivo** e gere o `DeviceToken`.
3. Vá em **Assinaturas → CNPJ** e assine o plano (há plano gratuito com limite mensal).
4. Copie:
   - `APIBRASIL_TOKEN` → token de acesso (Bearer)
   - `APIBRASIL_DEVICE_TOKEN` → token do dispositivo
5. Cole no `.env` do backend.

---

## 5. DataJud (CNJ)

1. Acesse a documentação pública do DataJud: [datajud.cnj.jus.br](https://datajud.cnj.jus.br).
2. Solicite acesso à API pública em **Acesso → Solicitar Chave**.
3. O CNJ enviará a chave por e-mail (prazo: até 5 dias úteis).
4. Copie a chave em `DATAJUD_API_KEY` no `.env` do backend.

> **Nota**: A API pública do DataJud busca por número de processo, não por CNPJ diretamente. A implementação atual busca nos tribunais mais relevantes (TRT 1-24 + principais TJs). Para cobertura total, use o Escavador em conjunto.

---

## 6. Escavador (Monitoramento processual)

1. Acesse [escavador.com](https://www.escavador.com) e crie conta empresarial.
2. Vá em **API → Chave de Acesso** e gere um token PAT (Personal Access Token).
3. Copie em `ESCAVADOR_TOKEN` no `.env` do backend.
4. Documentação V2: [api.escavador.com/v2/docs](https://api.escavador.com/v2/docs/)

> **Custo**: o Escavador cobra por crédito. A implementação já respeita a regra de acionar somente quando há nova movimentação relevante.

---

## 7. Stripe (Pagamentos)

### 7.1 Criar conta e configurar produtos
1. Acesse [dashboard.stripe.com](https://dashboard.stripe.com) e crie conta.
2. Em **Products**, crie:
   - **Pro Corretor** — R$ 197/mês (ou valor definido pela Traderisk)
   - **Pro Tomador** — R$ 97/mês
3. Copie o **Price ID** de cada plano (formato: `price_...`).

### 7.2 Chaves de API
Em **Developers → API keys**:
- `STRIPE_SECRET_KEY` → chave secreta (começa com `sk_test_` em teste, `sk_live_` em produção)

### 7.3 Webhook (após deploy do backend)
1. Em **Developers → Webhooks → Add endpoint**.
2. URL: `https://SUA_URL_RAILWAY/stripe/webhook`
3. Eventos a ouvir: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copie o **Signing secret** em `STRIPE_WEBHOOK_SECRET`.

### 7.4 Ativar modo live (produção)
- Toggle **Test mode → Live mode** no canto superior direito do dashboard.
- Gere novas chaves live e substitua as de teste.

---

## 8. GitHub

### 8.1 Criar repositório privado
1. Acesse [github.com/new](https://github.com/new).
2. Repositório: `traderisk-academy`, visibilidade **Private**.
3. Não inicialize com README (o projeto já tem).

### 8.2 Subir o código
```bash
git init
git add .
git commit -m "chore: estrutura inicial Traderisk Academy"
git branch -M main
git remote add origin https://github.com/traderisk/traderisk-academy.git
git push -u origin main
```

### 8.3 Proteger a branch main
Em **Settings → Branches → Add rule**:
- Pattern: `main`
- ✅ Require a pull request before merging
- ✅ Require status checks to pass (selecione `api-tests` e `web-build`)

### 8.4 Adicionar secrets do CI/CD
Em **Settings → Secrets and variables → Actions → New repository secret**, adicione:

| Secret | Valor |
|---|---|
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_SERVICE_KEY` | service_role key |
| `ANTHROPIC_API_KEY` | Chave da Anthropic |
| `OPENAI_API_KEY` | Chave da OpenAI |
| `VERCEL_TOKEN` | Token gerado no passo 9 |

---

## 9. Vercel (Frontend)

1. Acesse [vercel.com](https://vercel.com) e conecte com sua conta GitHub.
2. Clique em **Add New → Project → Import Git Repository**.
3. Selecione `traderisk-academy`.
4. Configure:
   - **Root Directory**: `apps/web`
   - **Framework**: Next.js (detectado automaticamente)
5. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_API_URL` → URL pública do Railway (passo 10)
6. Clique em **Deploy**.
7. Em **Settings → Domains**, adicione `academy.traderisk.com.br`.
8. Copie o token em **Account Settings → Tokens** e coloque como `VERCEL_TOKEN` nos secrets do GitHub.

---

## 10. Railway (Backend)

1. Acesse [railway.app](https://railway.app) e conecte com GitHub.
2. Clique em **New Project → Deploy from GitHub repo**.
3. Selecione `traderisk-academy` e defina o diretório raiz como `apps/api`.
4. Railway detecta o `Dockerfile` automaticamente.
5. Em **Variables**, adicione todas as variáveis do `apps/api/.env.example` preenchidas:
   - `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `SUPABASE_ANON_KEY`
   - `ANTHROPIC_API_KEY`, `CLAUDE_MODEL`
   - `OPENAI_API_KEY`
   - `APIBRASIL_TOKEN`, `APIBRASIL_DEVICE_TOKEN`
   - `DATAJUD_API_KEY`, `ESCAVADOR_TOKEN`
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
   - `ENVIRONMENT=production`, `DEBUG=false`
6. Em **Settings → Networking**, copie a URL pública (formato: `xxx.railway.app`).
7. Volte na Vercel e atualize `NEXT_PUBLIC_API_URL` com essa URL.

---

## 11. DNS (domínio academy.traderisk.com.br)

No painel do registrador/DNS de `traderisk.com.br`:

1. Crie um registro **CNAME**:
   - Nome: `academy`
   - Valor: `cname.vercel-dns.com`
   - TTL: 3600

2. Aguarde propagação (até 48h, normalmente < 1h).

3. A Vercel emitirá o certificado SSL automaticamente após a propagação.

---

## 12. Ingestão da Knowledge Base (pós-setup)

Após configurar Supabase e OpenAI:

```bash
cd apps/api
source .venv/bin/activate
export OPENAI_API_KEY=sk-...
export SUPABASE_URL=https://...supabase.co
export SUPABASE_SERVICE_KEY=eyJ...

python scripts/ingest_knowledge_base.py \
  --path packages/knowledge-base/agente-seguro-garantia
```

Para reingestão após atualizar os `.md`:
```sql
-- No SQL Editor do Supabase
TRUNCATE documentos_kb;
```
E execute o script novamente.

---

## 13. Instalação do Tesseract (OCR local)

O OCR de PDFs escaneados usa Tesseract. Em produção, o `Dockerfile` instala automaticamente. Para desenvolvimento local:

**Linux/WSL:**
```bash
sudo apt-get install tesseract-ocr tesseract-ocr-por
```

**macOS:**
```bash
brew install tesseract tesseract-lang
```

**Windows (nativo):**
1. Baixe o instalador em: [github.com/UB-Mannheim/tesseract/wiki](https://github.com/UB-Mannheim/tesseract/wiki)
2. Durante a instalação, selecione o pacote de idioma **Portuguese**.
3. Adicione o caminho de instalação ao `PATH` do sistema.

> PDFs com texto selecionável funcionam sem Tesseract — o OCR só é acionado em páginas escaneadas.

---

## Ordem recomendada de execução

```
1. Supabase (criar projeto + credenciais + extensões)
2. Anthropic + OpenAI (chaves de API)
3. Preencher apps/api/.env e apps/web/.env.local
4. supabase db push  ← Claude Code
5. Ingestão da KB   ← Claude Code
6. APIBrasil + DataJud + Escavador (opcional para dev)
7. GitHub (repositório + secrets + branch protection)
8. Railway (backend)
9. Vercel (frontend)
10. DNS (CNAME) + Stripe live
```
