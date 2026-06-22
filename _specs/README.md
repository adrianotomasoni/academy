# `_specs/` — Materiais de referência (Traderisk Academy)

Esta pasta reúne os **materiais já produzidos** para o Claude Code (e a equipe) usarem como
**referência / fonte de contexto** ao implementar a plataforma. **Não é a fonte da verdade do
código** — o que roda em produção continua em `apps/`, `supabase/migrations/` e
`packages/knowledge-base/`. Trate `_specs/` como leitura/consulta.

## Conteúdo

| Item | O que é |
|---|---|
| `ARQUITETURA-INTEGRACAO-IA.md` | Análise do estado atual e **como organizar a integração de IA sem quebrar o que o Lovable gerou**. Comece por aqui. |
| `schema-sql-completo.sql` | Consolidação (somente leitura) das migrations `0001…0010`: tabelas, enums, funções (`buscar_conhecimento`, `filtrar_seguradoras`), RLS e seed. |
| `knowledge-base/README.md` | Ponteiro para os 66 `.md` da base RAG em `packages/knowledge-base/agente-seguro-garantia/` e como ingeri-los. |
| `prompts/README.md` | Ponteiro para os prompts de IA em `apps/api/app/prompts/` (chat RAG e extração de contrato / M7). |
| `referencias/MEMORIA_MODALIDADES_SEGURO_GARANTIA.md` | Memória das 5 grandes famílias de modalidades em linguagem simples. Conteúdo novo, candidato a entrar na KB canônica. |
| `guia-mestre-desenvolvimento.docx` | Guia Mestre de Desenvolvimento (setup, Supabase, GitHub, deploy, boas práticas). |
| `PRD.docx` | **Rascunho v0.1** do Product Requirements gerado a partir de `docs/` + código. Revisar. |
| `modulo7-spec.docx` | **Rascunho v0.1** da spec do Módulo 7 (análise de contratos) gerado a partir do código. Revisar. |

## Como o Claude Code deve usar esta pasta

- **Consultar antes de implementar**: regras de negócio, schema e prompts já existem — reuse, não
  recrie.
- **Não duplicar**: KB e prompts vivem nos caminhos canônicos; aqui há só ponteiros. Ao editar
  conteúdo de RAG, edite os `.md` em `packages/knowledge-base/`; ao editar prompts, edite os `.py`
  em `apps/api/app/prompts/`.
- **Regras invioláveis** (ver `ARQUITETURA-INTEGRACAO-IA.md`): Mapfre fora de cotação; cosseguro só
  > R$ 200M de IS; Seguro de Crédito fora de escopo; nunca citar comissões a tomadores; garantia
  judicial só polo passivo; "a plataforma sinaliza, a seguradora decide".
