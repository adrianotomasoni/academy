# Agente de Análise de Seguro Garantia — Traderisk

Base de conhecimento estruturada para agente profissional de análise de contratos, editais, processos judiciais e demandas de Seguro Garantia em todas as modalidades.

## Arquitetura

```
00_NUCLEO/                    → System prompt, regras de comportamento, glossário, limites
01_CONHECIMENTO_BASE/         → Conhecimento transversal (vale para todas as modalidades)
02_GRUPOS_DE_MODALIDADES/     → Modalidades organizadas por grupo funcional
  judiciais/                  → Depósito recursal, civil, trabalhista, fiscal
  tradicionais/               → BID, execução, adiantamento, manutenção, retenção
  estruturadas/               → Imobiliárias, concessões, completion bond, aduaneiras...
  financeiras/                → M&A, escrow, FINEP, arbitragem, CRA/CRI...
03_PUBLICOS/                  → Perfis, dores e abordagem por público
04_OPERACAO_TRADERISK/        → Portais, Motor Judicial V4, seguradoras, SLA, fluxos
05_ARGUMENTOS_E_OBJECOES/     → Argumentação comercial e tratamento de objeções
06_FAQ/                       → FAQs por público e por tipo de demanda
07_INTEGRACOES/               → Estrutura para APIs externas (DataJud, APIBrasil CNPJ) — ampliação futura
```

## Como usar

- **Como system prompt**: usar `00_NUCLEO/system-prompt.md` como prompt principal e o restante como knowledge base.
- **Como RAG**: cada arquivo `.md` é um documento autocontido, com headers para chunking semântico.
- **Manutenção**: cada modalidade segue o template em `02_GRUPOS_DE_MODALIDADES/_TEMPLATE-modalidade.md`. Para adicionar nova modalidade, copiar o template para o grupo correto.

## Regras de manutenção

1. Conhecimento transversal vai em `01_CONHECIMENTO_BASE`, nunca duplicado nas modalidades.
2. Cada arquivo de modalidade aponta conexões com outras modalidades (seção 13 do template).
3. Legislação citada deve sempre incluir o número da norma. Verificar atualizações trimestralmente.
4. Mapfre está INATIVA no mercado de Seguro Garantia — nunca incluir em cotações ou materiais.
5. Cosseguro só se aplica a operações acima de R$ 200M de importância segurada.
6. Este projeto NÃO trata de Seguro de Crédito nem de qualquer outra frente da empresa — escopo exclusivo de Seguro Garantia.
7. A camada 07_INTEGRACOES é apenas estrutural: dados de API alimentam o agente; o conhecimento (00–06) decide o que fazer com eles. Não misturar as camadas.

## Status do conteúdo

- [x] Fase 1 — Núcleo + base + judiciais + públicos + FAQ
- [x] Fase 2 — Operação Traderisk + tradicionais
- [x] Fase 3 — Estruturadas + financeiras + argumentos/objeções (versão inicial — enriquecer com casos reais)

**Próximo passo recomendado**: alimentar cada modalidade com modelos reais de apólices, condições gerais das seguradoras e casos anonimizados.
