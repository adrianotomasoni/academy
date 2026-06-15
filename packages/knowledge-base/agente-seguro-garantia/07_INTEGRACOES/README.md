# 07_INTEGRACOES — Estrutura para Ampliação Futura

Camada de integrações externas do cérebro de Seguro Garantia. **Status: estruturação — não implementado.**

## Princípio
O conhecimento (camadas 00–06) é independente das integrações. As APIs alimentam o agente com DADOS (processos, cadastros); o conhecimento define o que FAZER com eles. Nunca misturar as camadas.

## Integrações planejadas
| Integração | Função no cérebro | Pasta |
|---|---|---|
| DataJud (CNJ) | Consulta de processos judiciais → qualificação de demandas judiciais e monitoramento de apólices | datajud/ |
| APIBrasil — CNPJ | Consulta cadastral de tomadores → pré-qualificação automática no fluxo de subscrição | apibrasil-cnpj/ |

## Casos de uso integrados (visão futura)
1. **Qualificação de demanda judicial**: usuário informa nº CNJ → DataJud retorna classe, fase, valor, partes → agente identifica polo do tomador, sub-modalidade e alertas (RJ, prazo).
2. **Pré-cadastro de tomador**: usuário informa CNPJ → APIBrasil retorna razão social, situação, CNAE, porte, QSA → agente monta o dossiê inicial de subscrição.
3. **Monitoramento de apólices judiciais**: rotina consulta movimentações dos processos vinculados → alerta de eventos que impactam a garantia (sentença, trânsito, extinção).

## Regras de custo e operação (princípios herdados)
- Consultas em lote/batch onde possível; cache local; nunca consultar em loop por item quando houver endpoint agregado.
- Empresas em Recuperação Judicial: sinalizar bloqueio de subscrição imediatamente.
- Dados de API NUNCA substituem análise documental — são pré-qualificação.
