# 06 — Deploy em Produção

## Visão geral

```
Frontend (Next.js)  →  Vercel
Backend (FastAPI)   →  Railway ou Render
Banco               →  Supabase (já em nuvem)
```

## Frontend na Vercel

1. Em [vercel.com](https://vercel.com), importe o repositório do GitHub.
2. Em **Root Directory**, selecione `apps/web`.
3. Framework: Next.js (detectado automaticamente).
4. Adicione as variáveis de ambiente:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   NEXT_PUBLIC_API_URL   (URL pública do backend)
   ```
5. Deploy. A Vercel faz deploy automático a cada push na `main`.

### Subdomínio

1. Em **Settings → Domains**, adicione `academy.traderisk.com.br`.
2. No provedor de DNS do traderisk.com.br, crie um registro CNAME:
   ```
   academy → cname.vercel-dns.com
   ```
3. Aguarde a propagação (~minutos a horas). SSL é automático.

## Backend no Railway

1. Em [railway.app](https://railway.app), crie um projeto a partir do GitHub.
2. Selecione o diretório `apps/api`.
3. Railway detecta o Dockerfile e faz o build.
4. Adicione todas as variáveis de ambiente do `.env` (exceto as `NEXT_PUBLIC_`).
5. Exponha a porta 8000 e pegue a URL pública gerada.
6. Coloque essa URL no `NEXT_PUBLIC_API_URL` da Vercel.

### Alternativa: Render

Mesmo princípio. Crie um **Web Service**, aponte para `apps/api`, use o Dockerfile, configure as variáveis.

## Checklist de produção

- [ ] Variáveis de ambiente configuradas em ambos os serviços (sem `.env` commitado)
- [ ] CORS no backend liberando o domínio de produção (`apps/api/app/main.py`)
- [ ] Supabase: Site URL e Redirect URLs incluindo o domínio de produção
- [ ] RLS habilitado em todas as tabelas sensíveis
- [ ] Stripe em modo live (chaves de produção)
- [ ] Knowledge base ingerida no Supabase de produção
- [ ] Domínio com SSL ativo
- [ ] Monitoramento: Sentry (erros) + PostHog (analytics)

## Variáveis por ambiente

Mantenha projetos Supabase separados para dev e prod, ou ao menos schemas separados. Nunca use a mesma `service_role` key em dev e prod.
