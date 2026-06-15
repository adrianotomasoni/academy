# 00 — Visão Geral para o Desenvolvedor

Leia este documento primeiro. Ele explica o projeto em 5 minutos.

## O que é

Plataforma de inteligência em Seguro Garantia com 7 módulos, 3 perfis de usuário (corretor, tomador, advogado) e modelo freemium. Funciona como funil de leads para a Traderisk.

## Mapa mental do código

```
Usuário no navegador
        ↓
apps/web (Next.js)  ──→ chama ──→  apps/api (FastAPI)
                                        ↓
                          ┌─────────────┼─────────────┐
                          ↓             ↓             ↓
                     Supabase      Claude API    Integrações
                  (banco+auth)    (IA chat +    (CNPJ, DataJud,
                                   análise)      PNCP, Escavador)
```

## Os 7 módulos e onde estão no código

| Módulo | Frontend | Backend |
|---|---|---|
| 1. Tela inicial CNPJ | `web/src/app/page.tsx` | `api/routers/dossie.py` |
| 2. Academia | `web/src/app/academia/` (a criar) | conteúdo em `packages/knowledge-base` |
| 3. Chat IA | `web/src/app/chat/` (a criar) | `api/routers/chat.py` + `services/chat.py` |
| 4. Guia seguradoras | `web/src/app/seguradoras/` (a criar) | `api/routers/seguradoras.py` |
| 5. Análise financeira | `web/src/app/analise/` (a criar) | `services/dossie.py` |
| 6. Pipeline judicial | `web/src/app/oportunidades/` (a criar) | `services/integracoes/datajud.py` |
| 7. Análise de contratos | `web/src/app/analisar/` (a criar) | `routers/analise.py` + `services/analise_documento.py` |

## Ordem de implementação recomendada

1. Setup local + Supabase (docs 01 e 02)
2. Schema no banco (migrations)
3. Ingestão da KB (doc 04) → chat já funciona
4. Tela inicial CNPJ (já tem o frontend base)
5. Módulo 7 (análise de contratos) — maior valor técnico
6. Guia de seguradoras (depende da planilha de linhas de corte preenchida)
7. Pipeline judicial (integrações DataJud/Escavador)

## O que já está pronto neste repositório

- Estrutura completa do monorepo
- Backend FastAPI funcional com todos os routers e serviços (com mocks)
- Prompts de IA (extração de contrato + chat RAG)
- Frontend com a tela inicial CNPJ funcionando
- Script de ingestão da base de conhecimento
- Base de conhecimento com 66 documentos técnicos
- Configuração de VS Code, Docker, CI
- Tutoriais completos de setup e integração

## O que falta implementar

- Telas dos módulos 2 a 7 no frontend
- OCR real (Textract) em `extrator_texto.py`
- Integrações reais (hoje em mock) — substituir os `_mock()` por chamadas reais
- Fluxo de pagamento Stripe
- Migrations 0002 a 0010 (SQL no documento Schema)

## Princípio que guia tudo

O conhecimento (base .md + tabela de regras) é separado do código. A equipe Traderisk atualiza regras de negócio sem precisar de deploy. Dados de API alimentam o agente; o conhecimento decide o que fazer com eles.
