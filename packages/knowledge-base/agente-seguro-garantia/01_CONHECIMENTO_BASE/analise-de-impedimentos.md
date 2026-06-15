# Análise de Contratos, Editais e Motor de Impedimentos

## Propósito deste documento

Este arquivo alimenta o Módulo 7 da plataforma (Análise de Contratos e Editais) e o assistente de chat (RAG). Contém as regras técnicas para identificar impedimentos à contratação de Seguro Garantia, as coberturas adicionais, a árvore de decisão de modalidade e as fórmulas de cálculo de IS.

O agente NUNCA deve afirmar que um contrato é viável ou inviável sem analisar o documento-base. Este arquivo orienta o raciocínio — a análise real exige o texto do contrato ou edital.

---

## Bloco 1 — Bloqueadores (impedem a emissão)

Bloqueadores são condições identificadas no contrato ou edital que tornam a emissão de Seguro Garantia tecnicamente impossível ou juridicamente inviável no mercado brasileiro. Quando identificado qualquer bloqueador, o relatório sinaliza em vermelho com a explicação e, quando existir, a saída possível.

### B1 — Vigência superior a 60 meses

**O que é:** prazo total do contrato (somando prorrogações previstas) superior a 60 meses.

**Por que bloqueia:** limite máximo aceito pelo mercado segurador brasileiro para uma única apólice. Nenhuma seguradora emite apólice com prazo superior a 60 meses.

**Base:** prática consolidada de mercado / apetite das seguradoras.

**Frases-gatilho no texto:** "prazo de X meses" / "vigência de X anos" / "prorrogável por X vezes de X meses" — calcular o total.

**Saída possível:** estratégia de apólices renováveis com compromisso formal de renovação, estruturada desde o início. Exige condução pela equipe técnica Traderisk.

**Exemplo de cláusula que dispara:** "O prazo de vigência do contrato é de 84 (oitenta e quatro) meses, podendo ser prorrogado nos termos da lei."

---

### B2 — Indenização trabalhista exigida na fase administrativa

**O que é:** o contrato exige que a garantia cubra indenizações a empregados do contratado ANTES de qualquer decisão judicial — ou seja, na fase administrativa.

**Por que bloqueia:** seguradoras de Seguro Garantia cobrem apenas a fase JUDICIAL (execução trabalhista após condenação). A fase administrativa é risco de crédito puro — não é objeto de garantia regulada pela SUSEP. Não existe produto no mercado que cubra isso no âmbito do Seguro Garantia.

**Base:** Circular SUSEP 662/2022 — definição de objeto garantido.

**Frases-gatilho:** "verbas trabalhistas dos empregados" / "encargos sociais sem decisão judicial" / "pagamento administrativo de obrigações trabalhistas" / "independentemente de decisão judicial".

**Saída possível:** negociar com o contratante a limitação da cobertura à fase judicial. Se não houver negociação, a operação é inviável para Seguro Garantia.

**Atenção:** NÃO confundir com B2. Se a cobertura trabalhista é exigida APENAS após decisão judicial, não é bloqueador — é o Alerta A6 (tratável).

---

### B3 — Cláusula de cancelamento unilateral pelo tomador

**O que é:** o contrato ou edital permite que o contratado (tomador) cancele a apólice sem anuência do contratante (segurado).

**Por que bloqueia:** viola a natureza jurídica do Seguro Garantia. A apólice pertence ao beneficiário — o tomador não pode extinguir unilateralmente uma garantia que protege o credor. Nenhuma seguradora emite apólice com essa cláusula.

**Base:** CPC/2015 (natureza da caução) + Circular SUSEP 662/2022.

**Frases-gatilho:** "o tomador/contratado poderá cancelar" / "rescisão da garantia a pedido do afiançado" / "cancelamento independente de anuência do beneficiário".

**Saída possível:** solicitar supressão da cláusula no instrumento contratual antes da emissão.

---

### B4 — Multa punitiva incluída no objeto da garantia

**O que é:** a garantia deve cobrir multas de natureza punitiva (ex: multas por danos morais, penas contratuais desproporcionais ao dano real, indenizações exemplares).

**Por que bloqueia:** seguradoras cobrem perdas compensatórias — equivalentes ao dano real sofrido pelo beneficiário. Multas punitivas são vedadas pelo princípio indenitário do seguro.

**Base:** Código Civil, art. 757 (princípio indenitário) + prática de mercado.

**Frases-gatilho:** "multa punitiva" / "pena convencional" / "dano moral" / "indenização exemplar" / "caráter pedagógico".

**Saída possível:** delimitar na apólice apenas as multas compensatórias. Se o contrato não permitir essa limitação, a operação é inviável.

**Atenção:** multas por atraso ou inadimplemento proporcional ao dano (compensatórias) NÃO são bloqueadores — são coberturas adicionais tratáveis.

---

### B5 — Ausência de prazo determinado na vigência exigida

**O que é:** o contrato exige garantia mas não define prazo de vigência, ou define como "até o encerramento do contrato" sem data fixada, ou "por prazo indeterminado".

**Por que bloqueia:** apólice de Seguro Garantia exige datas de início e término expressas (Circular SUSEP 662/2022). Vigência indeterminada é tecnicamente impossível.

**Frases-gatilho:** "até o encerramento" / "até a extinção do contrato" / "por prazo indeterminado" / "até deliberação das partes" / "até a conclusão".

**Saída possível:** definir a vigência como o prazo do contrato + período de observação de 90 dias, com cláusula de renovação automática. Exige validação com o contratante.

---

### B6 — Objeto ilícito, vedado ou sem cobertura no mercado

**O que é:** o contrato envolve atividade para a qual não existe Seguro Garantia regulado.

**Por que bloqueia:** a SUSEP não autoriza cobertura de obrigações decorrentes de atividade ilícita, embargada ou não regulada.

**Saída possível:** nenhuma dentro do Seguro Garantia.

---

## Bloco 2 — Alertas (exigem estruturação específica)

Alertas não impedem a emissão, mas exigem atenção técnica — estruturação da apólice, estratégia de renovação, seleção correta de seguradoras ou emissão de apólices adicionais.

### A1 — Vigência entre 36 e 60 meses

**O que é:** prazo total do contrato entre 3 e 5 anos.

**Impacto:** dentro do aceite do mercado, mas exige gestão ativa de renovações. Vencimento sem renovação = inadimplência contratual do tomador.

**Ação:** definir cronograma de renovações desde a primeira emissão. A Traderisk monitora e dispara alertas automáticos.

---

### A2 — IS acima de R$ 200M

**O que é:** valor do contrato resulta em IS superior a R$ 200M.

**Impacto:** acima da capacidade individual da maioria das seguradoras. Única situação em que cosseguro se aplica.

**Ação:** encaminhar OBRIGATORIAMENTE para a equipe técnica Traderisk para estruturação de cosseguro.

**Regra crítica:** cosseguro é exceção, não estratégia comum. Aplicável APENAS acima de R$ 200M de IS.

---

### A3 — Cláusula de step-in / retomada (Art. 102 da Lei 14.133/2021)

**O que é:** o contrato prevê que, em caso de inadimplemento, a seguradora pode assumir e concluir o objeto.

**Frases-gatilho:** "cláusula de retomada" / "assunção pela seguradora" / "step-in" / "art. 102" / "conclusão pela garantidora" / "intervenção da seguradora".

**Impacto:** apetite restrito — nem todas as seguradoras aceitam. IS pode chegar a 30% do contrato. Subscrição muito mais criteriosa.

**Ação:** usar o filtro de seguradoras do Módulo 4 para identificar quem tem apetite para step-in. Informar o tomador sobre a possibilidade real da seguradora assumir a operação.

---

### A4 — Adiantamento de pagamento identificado

**O que é:** o contrato prevê pagamento antecipado ao contratado antes da execução.

**Frases-gatilho:** "adiantamento de X%" / "mobilização de X%" / "antecipação de pagamento" / "pagamento antecipado de" / "pagamento de sinal".

**Impacto:** exige apólice de Adiantamento de Pagamento SEPARADA da garantia de execução. IS = 100% do valor antecipado.

**Ação:** estruturar duas apólices — Execução e Adiantamento. Programar endossos de redução conforme amortização nas medições.

---

### A5 — Retenção de pagamento nas medições

**O que é:** o contrato retém percentual de cada medição como garantia informal.

**Frases-gatilho:** "retenção de X% sobre as medições" / "retenção de garantia" / "desconto de X% das faturas" / "caução de execução retida nas medições".

**Impacto:** o contratado perde liquidez ao longo da execução. A modalidade Retenção de Pagamento substitui essa retenção e libera o fluxo.

**Ação:** apresentar a modalidade de Retenção de Pagamento ao tomador como oportunidade comercial — libera capital imobilizado nas medições.

---

### A6 — Indenizações trabalhistas na fase JUDICIAL

**O que é:** o contrato exige cobertura de verbas trabalhistas APÓS condenação judicial.

**Diferença do B2:** aqui a fase é judicial (tratável). No B2, a fase é administrativa (bloqueador).

**Frases-gatilho:** "verbas trabalhistas por decisão judicial" / "condenações trabalhistas" / "execução trabalhista".

**Ação:** estruturar duas frentes — garantia de execução contratual + apólice de Garantia Judicial Trabalhista separada para as condenações.

---

### A7 — Aditivos previstos no contrato

**O que é:** o contrato prevê possibilidade de aditivos de prazo ou valor.

**Frases-gatilho:** "poderá ser aditado" / "prorrogável nos termos da lei" / "aditivos de até X%" / "acréscimos ou supressões".

**Impacto:** cada aditivo exige endosso correspondente. Sem endosso, a apólice fica defasada e o tomador entra em inadimplência.

**Ação:** informar o tomador sobre a obrigação de endosso a cada aditivo. A Traderisk monitora e dispara alertas.

---

### A8 — Prazo de apresentação da garantia muito curto

**O que é:** o contrato exige a apólice em menos de 5 dias úteis da assinatura.

**Frases-gatilho:** "apresentar no ato da assinatura" / "no prazo de X dias úteis da assinatura" / "no prazo de X dias corridos".

**Impacto:** risco de não conseguir emitir a tempo se o tomador não tiver limite pré-aprovado.

**Ação:** aprovar o limite de crédito do tomador ANTES da assinatura. SLA Traderisk: 3h para perfis padrão com limite aprovado.

---

### A9 — BID e Execução no mesmo processo

**O que é:** o edital exige garantia de proposta na fase de licitação E garantia de execução após a assinatura.

**Impacto:** são duas apólices distintas com IS, prazo e objeto diferentes. Erro comum: emitir apenas uma.

**Ação:** estruturar emissão em dois momentos — BID antes das propostas (IS até 1% do estimado); Execução na assinatura (IS 5% do contrato).

---

## Bloco 3 — Coberturas adicionais e como identificá-las

| Cobertura | Frases-gatilho | Tratamento |
|---|---|---|
| Multas compensatórias | "multa por atraso de X%" / "multa por inexecução" | Verificar se entra na IS ou requer cobertura adicional |
| Indenizações trabalhistas (fase judicial) | "verbas trabalhistas por decisão judicial" | Apólice Judicial Trabalhista separada (A6) |
| Encargos previdenciários | "INSS do contratado" / "FGTS dos empregados" | Verificar escopo e fase — alerta se fase administrativa |
| Obrigações fiscais | "tributos vinculados ao contrato" / "ISS" / "ICMS" | Delimitar escopo na apólice — não é garantia fiscal padrão |
| Step-in / retomada | "assunção pela seguradora" / "art. 102" | Alerta A3 — seguradoras específicas |
| Manutenção corretiva | "período de garantia técnica" / "prazo de garantia pós-entrega" | Apólice de Manutenção Corretiva após recebimento definitivo |
| Responsabilidade civil | "danos a terceiros" / "RC durante a execução" | ATENÇÃO: RC é seguro distinto, NÃO é Seguro Garantia |
| Adiantamento | "mobilização" / "pagamento antecipado de X%" | Alerta A4 — apólice de Adiantamento separada |
| Retenção nas medições | "retenção de X% das medições" | Alerta A5 — oportunidade de Retenção de Pagamento |
| Garantia de proposta | "garantia de proposta" / "BID" / "proposta de preço" | Alerta A9 — BID separado da Execução |

---

## Bloco 4 — Árvore de decisão de modalidade

```
TIPO DE DOCUMENTO / OBJETO
├── Edital de licitação
│   ├── Fase de proposta → Garantia de Licitação (BID) | IS: até 1% do estimado
│   └── Após assinatura → Garantia de Execução | IS: 5% padrão; até 30% c/ step-in
│
├── Contrato de obra / construção
│   ├── → Garantia de Execução (construção)
│   ├── + Adiantamento (se houver antecipação)
│   ├── + Retenção (se houver retenção nas medições)
│   └── + Manutenção Corretiva (pós-recebimento definitivo)
│
├── Contrato de fornecimento de bens
│   └── → Garantia de Execução (fornecimento)
│
├── Contrato de prestação de serviços
│   └── → Garantia de Execução (serviços)
│
├── Contrato de concessão / PPP
│   └── → Garantias Estruturadas (Concessão Pública) — ESCALAR equipe técnica
│
├── Contrato de locação comercial (PJ)
│   └── → Garantia Imobiliária / Fiança Locatícia PJ
│
└── Contrato privado com obrigação financeira
    └── → Avaliar grupo Financeiras conforme natureza da obrigação
```

---

## Bloco 5 — Cálculo de IS por modalidade

| Modalidade | Base de cálculo | Norma |
|---|---|---|
| Garantia de Licitação (BID) | Valor estimado do edital × % explícito (máx 1%) | Lei 14.133, Art. 58, §1º |
| Garantia de Execução — contrato público padrão | Valor do contrato × 5% | Lei 14.133, Art. 96 |
| Garantia de Execução — alta complexidade | Valor do contrato × até 10% | Lei 14.133, Art. 96 |
| Garantia de Execução — grande vulto c/ step-in | Valor do contrato × até 30% | Lei 14.133, Art. 99 e 102 |
| Adiantamento de Pagamento | 100% do valor antecipado | Prática de mercado |
| Retenção de Pagamento | Saldo retido + projeção de retenções futuras | Prática de mercado |
| Garantia Judicial — regra geral | Débito atualizado + 30% | CPC, Art. 835, §2º |
| Depósito Recursal Trabalhista | Condenação até o teto do TST vigente | CLT, Art. 899, §11 |
| Garantia de Energia | Conforme fórmula contratual (tipicamente 1–6 meses de faturamento) | Contrato bilateral |
| Parcelamento Fiscal | Débito + encargos conforme norma do programa | Norma específica do programa |

---

## Regras de manutenção deste arquivo

1. Revisar bloqueadores e alertas trimestralmente — novas seguradoras podem ter apetites diferentes.
2. Atualizar frases-gatilho com casos reais identificados na operação.
3. Verificar alterações na Lei 14.133/2021 e Circular SUSEP 662/2022.
4. Incluir novos impedimentos identificados em contratos reais (com anonimização).
