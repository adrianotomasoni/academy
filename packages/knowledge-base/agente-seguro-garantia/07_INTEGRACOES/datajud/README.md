# Integração DataJud — API Pública do CNJ

**Status: estruturação futura. Documento de arquitetura, sem implementação.**

## O que é
API pública do CNJ que disponibiliza metadados processuais de todos os tribunais brasileiros (base nacional de dados do Poder Judiciário), via endpoints Elasticsearch.

## Dados relevantes para o agente de Seguro Garantia
- Número do processo (CNJ), tribunal, órgão julgador.
- Classe e assuntos processuais (códigos TPU) → mapeáveis para sub-modalidade judicial.
- Partes e polos → identificação de polo passivo (regra: só polo passivo contrata garantia).
- Movimentações → fase processual, sentença, trânsito em julgado, extinção (gatilhos de emissão, renovação e baixa).
- Valor da causa (quando disponível) → base preliminar da IS.

## Endpoint (referência)
- Base: `https://api-publica.datajud.cnj.jus.br/api_publica_{tribunal}/_search`
- Autenticação: header `Authorization: APIKey {chave pública CNJ}`
- Método: POST com query Elasticsearch (match por numeroProcesso etc.)

## Mapeamento DataJud → conhecimento do agente
| Dado DataJud | Camada do cérebro | Uso |
|---|---|---|
| Tribunal/justiça (segmento do nº CNJ) | 02/judiciais | Trabalhista/cível/fiscal → sub-modalidade |
| Classe + movimentação | 02/judiciais | Fase: recurso vs execução → Depósito Recursal vs Judicial |
| Polo das partes | 00_NUCLEO regras | Validar polo passivo do tomador |
| Movimentações de extinção | 04_OPERACAO | Gatilho de baixa da apólice |

## Princípios operacionais (a implementar)
- Consultas batch a cada 15 dias para monitoramento de carteira; consulta on-demand na qualificação de demanda nova.
- Cache local das respostas; reconsulta apenas com indício de movimentação nova.
- Tratar indisponibilidade por tribunal (cobertura varia).

## Estrutura futura sugerida do repositório
```
datajud/
├── README.md            (este documento)
├── docs/
│   ├── mapeamento-tpu.md       (códigos classe/assunto → sub-modalidade)
│   └── tribunais-endpoints.md  (aliases por tribunal)
├── src/                 (cliente da API — futuro)
└── tests/               (futuro)
```
