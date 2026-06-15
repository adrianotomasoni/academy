# 02 — Configuração do Supabase

O Supabase é o banco de dados, a autenticação e o storage da plataforma.

## Passo 1 — Criar o projeto

1. Acesse [supabase.com](https://supabase.com) e crie uma conta.
2. Clique em **New Project**.
3. Nome: `traderisk-academy`. Região: **South America (São Paulo)**.
4. Defina uma senha forte para o banco (guarde-a).
5. Aguarde o provisionamento (~2 min).

## Passo 2 — Pegar as credenciais

No painel do projeto, vá em **Settings → API**:

| Credencial | Onde usar |
|---|---|
| Project URL | `SUPABASE_URL` (backend) e `NEXT_PUBLIC_SUPABASE_URL` (frontend) |
| `anon` `public` key | `SUPABASE_ANON_KEY` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `service_role` key | `SUPABASE_SERVICE_KEY` (backend APENAS — nunca no frontend) |

> ⚠️ A `service_role` key ignora todas as regras de segurança (RLS). Nunca a coloque no frontend nem a commite. Só no `.env` do backend.

## Passo 3 — Habilitar extensões

No painel, vá em **SQL Editor** e execute:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

## Passo 4 — Criar o schema

Execute as migrations na ordem, copiando o conteúdo de cada arquivo para o SQL Editor:

```
supabase/migrations/0001_extensoes_e_enums.sql
supabase/migrations/0002_usuarios_e_auth.sql
supabase/migrations/0003_tomadores.sql
supabase/migrations/0004_dados_externos.sql
supabase/migrations/0005_analise_financeira.sql
supabase/migrations/0006_seguradoras_linhas_corte.sql
supabase/migrations/0007_knowledge_base.sql
supabase/migrations/0008_pipeline_judicial.sql
supabase/migrations/0009_analise_documentos.sql
supabase/migrations/0010_rls_e_seed.sql
```

> O conteúdo completo está no documento "Schema SQL — Supabase" e nos arquivos de migration.

## Passo 5 — Configurar autenticação

1. Vá em **Authentication → Providers**.
2. Ative **Email** (confirmação por e-mail).
3. Opcional: ative **Google** e **Microsoft** para login social.
4. Em **URL Configuration**, defina:
   - Site URL: `http://localhost:3000` (dev) e `https://academy.traderisk.com.br` (prod)
   - Redirect URLs: adicione ambas.

## Passo 6 — Configurar o Storage

1. Vá em **Storage → Create bucket**.
2. Crie dois buckets:
   - `documentos` (privado) — contratos e balanços enviados.
   - `condicoes-gerais` (privado) — condições gerais das seguradoras.
3. As políticas de acesso são aplicadas via RLS (ver migration 0010).

## Passo 7 — Usar o Supabase CLI (recomendado)

Instale o CLI para versionar migrations:

```bash
npm install -g supabase
supabase login
supabase link --project-ref SEU_PROJECT_REF
supabase db push      # aplica as migrations locais no projeto remoto
```

O `project-ref` está na URL do projeto (`https://SEU_PROJECT_REF.supabase.co`).
