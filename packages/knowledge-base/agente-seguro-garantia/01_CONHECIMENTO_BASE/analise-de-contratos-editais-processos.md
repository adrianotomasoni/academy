# Análise de Contratos, Editais e Processos — Roteiro do Analista

## 1. Análise de CONTRATO (garantia contratual)

Localizar e extrair:

1. **Cláusula de garantia** — percentual exigido, modalidades aceitas, prazo de apresentação, regras de renovação/reforço.
2. **Vigência contratual** — início, término, previsão de prorrogação automática ou por aditivo.
3. **Objeto do contrato** — o que exatamente está sendo garantido (define risco e modalidade).
4. **Valor do contrato** — base de cálculo da IS.
5. **Penalidades** — multas, sanções, hipóteses de rescisão e efeitos sobre a garantia.
6. **Aditivos previstos** — aumento de prazo/valor exigirá endosso ou nova apólice.
7. **Período de observação pós-entrega** — a garantia normalmente deve cobrir prazo adicional após a conclusão (mínimo usual: 90 dias).
8. **Foro contratual.**

Perguntas que o analista responde antes de cotar:
- A modalidade pedida é a correta para esta obrigação?
- A IS está adequada (percentual x valor do contrato)?
- O prazo da apólice cobre integralmente a obrigação + observação?
- Há risco de prorrogação que exigirá endosso?
- O segurado aceita Seguro Garantia (e há restrições de rating/seguradora)?

## 2. Análise de EDITAL (licitação)

1. **Item de garantia** — exige garantia de proposta (BID)? Exige garantia de execução do futuro contrato?
2. **Percentual de proposta** — Lei 14.133/2021, Art. 58, §1º: até 1% do valor estimado.
3. **Prazo de validade da proposta** — a apólice BID deve cobrir este prazo.
4. **Percentual de execução** — padrão 5% (Art. 96); até 10% em alta complexidade; até 30% com cláusula de retomada em obras de grande vulto (Art. 99).
5. **Modalidades aceitas** — o edital pode listar caução, fiança bancária e seguro garantia; verificar se há restrições.
6. **Prazo de entrega da garantia** — frequentemente exigida no ato da assinatura do contrato; planejar emissão com antecedência.
7. **Exigências específicas** — rating mínimo de seguradora, cláusulas obrigatórias, modelo de apólice anexo ao edital.
8. **Objeto e regime de execução** — empreitada por preço global/unitário, contratação integrada (impacta risco).

## 3. Análise de PROCESSO JUDICIAL (garantia judicial)

1. **Número CNJ** — formato NNNNNNN-DD.AAAA.J.TT.OOOO.
2. **Justiça e vara** — trabalhista, federal, estadual; define modalidade e requisitos.
3. **Fase processual** — conhecimento, recurso, execução, cumprimento de sentença. Define a sub-modalidade e o apetite da seguradora.
4. **Valor a garantir** — valor do débito + 30% (regra geral CPC, Art. 835, §2º) ou valor fixado em decisão; no depósito recursal, observar o teto do TST.
5. **Prazo de apresentação** — intransponível. Confirmar data exata.
6. **Exigências do juízo** — cláusula de incontestabilidade, vigência mínima, renovação automática, modelo específico.
7. **Polo do cliente** — a garantia é contratada por quem está no **polo passivo** (réu/executado). Cliente no polo ativo não contrata garantia.
8. **Situação do tomador** — empresa em RJ: bloqueio padrão.

## 4. Decisor de modalidade (árvore rápida)

```
A obrigação nasce de...
├── PROCESSO JUDICIAL?
│   ├── Justiça do Trabalho + fase de recurso → Depósito Recursal Trabalhista
│   ├── Justiça do Trabalho + execução → Judicial Trabalhista
│   ├── Execução fiscal / débito tributário → Judicial Fiscal
│   └── Cível (execução, penhora, caução) → Judicial Civil
├── LICITAÇÃO (antes do contrato)? → Garantia de Licitação (BID)
├── CONTRATO assinado/a assinar?
│   ├── Cumprimento da obrigação principal → Execução (Performance)
│   ├── Valor adiantado pelo contratante → Adiantamento de Pagamento
│   ├── Substituir retenção de medições → Retenção de Pagamento
│   └── Garantia pós-entrega → Manutenção Corretiva
├── OPERAÇÃO IMOBILIÁRIA/LOCAÇÃO PJ? → Garantias Imobiliárias / Fiança Locatícia PJ
├── COMÉRCIO EXTERIOR/REGIME ADUANEIRO? → Garantias Aduaneiras
├── ENERGIA (ACL/ACR)? → Garantia de Energia
├── PARCELAMENTO/CRÉDITO TRIBUTÁRIO (adm.)? → Parcelamento Fiscal / Créditos Tributários
└── OBRIGAÇÃO FINANCEIRA (M&A, escrow, títulos, arbitragem...)? → Garantias Financeiras
```

## 5. Erros de enquadramento mais comuns (NUNCA cometer)

- Confundir **garantia de proposta (BID)** com **garantia de execução** — são momentos e objetos diferentes.
- Confundir **Judicial Trabalhista (execução)** com **Depósito Recursal** — fases e regras diferentes.
- Tratar garantia judicial como contratual (regras de incontestabilidade e renovação são distintas).
- Emitir apólice de execução sem cobrir o período de observação pós-entrega.
- Ignorar o acréscimo de 30% nas garantias judiciais cíveis/fiscais.
