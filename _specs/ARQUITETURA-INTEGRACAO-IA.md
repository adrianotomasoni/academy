# Como organizar a integração de IA sem quebrar o que o Lovable gerou

> Resposta à pergunta inicial do projeto. Resumo: **a separação que protege o frontend já existe.**
> O trabalho pesado de IA segue no backend Python; o frontend Lovable só consome REST.

## 1. Estado atual real (mais do que "frontend + auth")

O repositório já é um **monorepo** com a integração de IA estruturada e separada do frontend:

```
apps/web      Next.js 14 (App Router) — o que o Lovable gerou/evoluiu. Auth Supabase SSR.
apps/api      FastAPI (Python) — TODA a IA (chat RAG, M7, integrações). Mocks p/ dev.
supabase/     10 migrations — schema, funções, RLS, seed (Mapfre inativa, regras B/A).
packages/     knowledge-base/ — 66 .md (RAG).
scripts/      ingest_knowledge_base.py — ingestão da KB em documentos_kb.
```

Tudo que estava na lista de "preciso implementar" **já tem esqueleto funcional**:

| Capacidade | Onde está | Estado |
|---|---|---|
| Chat RAG (M3) | `apps/api/app/services/chat.py` + RPC `buscar_conhecimento` + `prompts/chat_rag.py` + página `app/(app)/chat` | Funcional (depende de chaves + KB ingerida) |
| Análise de contratos (M7) | `services/analise_documento.py` + `services/extrator_texto.py` + `prompts/extracao_contrato.py` + página `app/(app)/contratos` | Funcional |
| Integrações | `services/integracoes/{apibrasil,datajud,pncp,escavador}.py` | Funcional com **modo mock** (caem em mock sem credencial, via `base.py`) |
| Motor de impedimentos | seed `regras_impedimento` (0009) + schema no prompt do M7 | **Declarativo** (no prompt) + tabela; falta passo procedural (ver §5) |

## 2. A fronteira que protege o Lovable (já existe)

```
Browser ──> apps/web (Next.js)
                │  fetch() em src/lib/api.ts, usando NEXT_PUBLIC_API_URL
                ▼
            apps/api (FastAPI)  ──> Supabase (pgvector, RPCs, RLS)
                                ──> Claude (Anthropic) + OpenAI (embeddings)
                                ──> APIBrasil / DataJud / PNCP / Escavador
```

- O frontend **nunca** chama Claude/OpenAI direto — não tem chave de IA. Toda IA é server-side no
  `apps/api`. Isso é o que mantém as chaves seguras e o frontend estável.
- Auth: Supabase SSR. `src/middleware.ts` protege as rotas em `ROTAS_PROTEGIDAS`; `src/lib/session.ts`
  pega o `access_token` e o `api.ts` o envia como `Bearer`. O backend valida o JWT em
  `app/core/auth.py` e aplica limites do plano freemium.

## 3. Regra de ouro para estender sem quebrar

**Mudanças de IA são aditivas e ficam no backend.** Para uma nova capacidade:

1. Implementar a lógica em `apps/api/app/services/` (e prompt em `app/prompts/` se for IA).
2. Expor um endpoint novo em `app/routers/` e montá-lo em `app/main.py`.
3. No frontend: adicionar **uma função** em `apps/web/src/lib/api.ts` e **uma página** em
   `app/(app)/` (já protegida). Se a rota for nova, incluir no array `ROTAS_PROTEGIDAS` do
   `middleware.ts`.

**Não tocar** (o fluxo de sessão/cookies depende disso): `src/lib/supabase-server.ts`,
`src/lib/supabase.ts`, `src/middleware.ts`, esquema de cores Tailwind (navy/teal) e o contrato dos
endpoints REST já consumidos (`/chat`, `/analise/contrato`, `/dossie/{cnpj}`, `/processos/{cnpj}`,
`/seguradoras/filtrar`). Alterar payload desses endpoints quebra páginas existentes.

## 4. Conhecimento separado do código (editável sem deploy)

- **KB (RAG)**: `.md` em `packages/knowledge-base/` → ingeridos em `documentos_kb`. Atualizar a KB =
  editar `.md` + reingerir, sem deploy de código.
- **Regras de impedimento**: tabela `regras_impedimento` (seed B1–B6 / A1–A9). Editáveis no banco.

## 5. O que ainda falta endurecer (próximos passos, fora deste escopo)

1. **Motor de impedimentos procedural**: hoje os impedimentos críticos saem do JSON da IA. Falta um
   passo no backend que cruze o JSON extraído com `regras_impedimento` e **force** os bloqueadores
   por regra fixa (não só por IA) — coerente com a boa prática "impedimentos críticos checados por
   regra, não só por IA".
2. **Páginas ainda em stub** no frontend: `/judicial`, `/comunidade`, `/academia` (UI pronta, sem
   backend). Pipeline judicial depende de DataJud/Escavador reais.
3. **Credenciais reais** das integrações (hoje em mock) e ingestão da KB no Supabase de produção.

## 6. Regras de negócio invioláveis (e onde já estão aplicadas)

| Regra | Onde está garantida |
|---|---|
| Mapfre inativa em Seguro Garantia | `filtrar_seguradoras()` (0006, `NOT ILIKE '%mapfre%'`) + seed `ativa=FALSE` (0010) + `prompts/chat_rag.py` |
| Cosseguro só acima de R$ 200M de IS | `linhas_de_corte.requer_cosseguro` + alerta **A2** em `extracao_contrato.py` |
| Seguro de Crédito fora de escopo | system prompt do chat |
| Nunca mencionar comissões a tomadores | perfil `tomador` em `chat_rag.py` |
| Garantia judicial só polo passivo | `datajud.contar_polo_passivo()` |
| A plataforma sinaliza; a seguradora decide | prompts de chat e de estratégia do M7 |

## 7. Custos sob controle (já previstos)

- Cache de CNPJ ~30 dias (`tomadores.cache_expira_em`).
- Embeddings gerados **uma vez** na ingestão, não a cada busca.
- Limites freemium no backend (`app/core/config.py`: 10 perguntas/mês, 3 análises/mês).
