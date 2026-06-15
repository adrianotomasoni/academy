# Motor Judicial V4 e Fluxos Operacionais

## Motor Judicial V4
Sistema proprietário de emissão automatizada de apólices judiciais (foco: depósito recursal trabalhista de perfil padrão). Reduz o ciclo de emissão a minutos para tomadores com limite aprovado.

## Fluxo de cotação padrão (todas as modalidades)
1. Recepção da demanda (corretor, tomador, advogado).
2. Qualificação: modalidade, documento-base, valor, prazo, urgência.
3. Verificação de alertas (RJ, restrições, prazo processual).
4. Cadastro/limite do tomador (se necessário): coleta documental → submissão às seguradoras de melhor apetite.
5. Cotação comparada entre seguradoras.
6. Emissão e entrega (minuta para validação → apólice definitiva).
7. Pós-emissão: registro no Portal, monitoramento de vigência/aditivos, alertas de renovação.

## SLA
- Maioria das respostas: até 3 horas.
- Operações estruturadas/grandes valores: prazo negociado com a equipe técnica.

## Roteamento de demandas
| Demanda | Caminho |
|---|---|
| Depósito recursal trabalhista, perfil padrão | Motor Judicial V4 / Portal (digital) |
| Licitação (BID), perfil padrão | Portal (digital) |
| Execução, judiciais civil/fiscal, adiantamento | Subscrição interna Traderisk |
| Estruturadas e financeiras | Equipe técnica dedicada |
| IS > R$ 20M | Equipe técnica |
| IS > R$ 200M | Equipe técnica + possível cosseguro |
