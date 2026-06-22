// ARQUIVO GERADO — não edite à mão.
// Fonte: packages/knowledge-base/agente-seguro-garantia/02_GRUPOS_DE_MODALIDADES
// Regenerar: npm run gen:modalidades

export type SecaoConteudo = { titulo: string; md: string };
export type ModalidadeConteudo = { intro: string; sections: SecaoConteudo[] };

export const MODALIDADES_CONTEUDO: Record<string, ModalidadeConteudo> = {
  "licitacao-bid": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição e uso",
        "md": "Garante que o licitante, se declarado vencedor, assinará o contrato e apresentará a garantia de execução. Protege o órgão licitante contra a desistência do vencedor."
      },
      {
        "titulo": "Partes envolvidas",
        "md": "- **Tomador:** empresa licitante.\n- **Segurado:** órgão/entidade que conduz a licitação (público ou privado).\n- **Objeto:** a manutenção da proposta e a assinatura do contrato, no certame específico."
      },
      {
        "titulo": "Quando usar",
        "md": "- Editais que exigem garantia de proposta (Lei 14.133/2021, Art. 58, §1º — até 1% do valor estimado).\n- Concorrências, pregões e RDC com exigência de garantia de manutenção de proposta.\n- Processos seletivos privados que exigem bid bond."
      },
      {
        "titulo": "Quando NÃO usar",
        "md": "- Após a assinatura do contrato → modalidade correta é **Execução**. NUNCA confundir proposta com execução.\n- Editais que não exigem garantia de proposta (não criar exigência inexistente)."
      },
      {
        "titulo": "Documentação necessária",
        "md": "- Edital completo (número, órgão, objeto).\n- Valor estimado da contratação e percentual exigido.\n- Data de abertura do certame e prazo de validade da proposta.\n- Cadastro do tomador (limite aprovado agiliza emissões recorrentes)."
      },
      {
        "titulo": "Checklist de análise",
        "md": "- [ ] Percentual e base de cálculo conforme o edital (regra: até 1% do valor estimado).\n- [ ] Vigência ≥ prazo de validade da proposta (com folga para prorrogações do certame).\n- [ ] Modalidades aceitas no edital (verificar se seguro garantia está listado).\n- [ ] Exigências formais: modelo anexo, beneficiário correto, número do edital no objeto.\n- [ ] Prazo de entrega da garantia (alguns editais exigem junto com a proposta)."
      },
      {
        "titulo": "Legislação aplicável",
        "md": "- Lei 14.133/2021, Art. 58, §1º.\n- Lei 8.666/1993 (certames sob sua regência).\n- Circular SUSEP 662/2022."
      },
      {
        "titulo": "Alertas críticos",
        "md": "- Prazo do certame: a apólice precisa estar pronta na data de entrega dos envelopes/proposta. Planejar com antecedência.\n- Certame prorrogado/suspenso → verificar necessidade de endosso de prazo.\n- Vencendo o certame → programar IMEDIATAMENTE a garantia de execução (exigida na assinatura)."
      },
      {
        "titulo": "Critérios de subscrição específicos",
        "md": "- Ticket baixo e risco reduzido — modalidade de apetite amplo e emissão ágil.\n- Empresas licitantes frequentes: aprovar limite rotativo para emissão digital recorrente (Portal do Tomador)."
      },
      {
        "titulo": "Perguntas frequentes",
        "md": "**P: Perdi a licitação. E a apólice?**\nR: A apólice se extingue com o encerramento do certame sem adjudicação ao tomador. Não há devolução proporcional de prêmio na regra geral — verificar condições.\n\n**P: Venci. A mesma apólice serve para o contrato?**\nR: Não. A garantia de proposta cobre o certame; o contrato exige nova apólice de **execução**, com IS e prazo próprios."
      },
      {
        "titulo": "Argumentos comerciais",
        "md": "- Pequena no valor, decisiva na participação: sem ela, a proposta é desclassificada.\n- Emissão digital pela Traderisk permite participar de mais editais sem fricção operacional."
      },
      {
        "titulo": "Objeções comuns",
        "md": "**\"O valor é pequeno, resolvo com caução em dinheiro.\"** → Multiplicado pelo número de certames, o capital imobilizado em cauções vira um passivo de gestão (controlar devoluções, prazos). A apólice elimina a imobilização e a gestão de devoluções."
      },
      {
        "titulo": "Conexões",
        "md": "- Venceu o certame → **Execução** (e **Adiantamento**, se houver antecipação).\n- Empresa licitante com processos judiciais → grupo **judiciais**."
      }
    ]
  },
  "execucao-contrato": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição e uso",
        "md": "Garante o fiel cumprimento das obrigações assumidas pelo tomador no contrato principal: executar a obra, entregar os bens ou prestar os serviços conforme especificações, prazos e condições."
      },
      {
        "titulo": "Partes envolvidas",
        "md": "- **Tomador:** contratado (construtora, fornecedora, prestadora).\n- **Segurado:** contratante (órgão público ou empresa privada).\n- **Objeto:** as obrigações do contrato específico."
      },
      {
        "titulo": "Quando usar",
        "md": "- Contratos públicos com exigência de garantia (Lei 14.133/2021, Art. 96).\n- Contratos privados de obra, fornecimento ou serviços com cláusula de garantia.\n- Concessões e contratos de longo prazo (avaliar também o grupo estruturadas).\n- Obras de grande vulto com cláusula de retomada (Art. 99 — até 30%)."
      },
      {
        "titulo": "Quando NÃO usar",
        "md": "- Antes do contrato (fase de certame) → **Licitação (BID)**.\n- Para garantir devolução de antecipação → **Adiantamento de Pagamento**.\n- Para o período pós-entrega isoladamente → **Manutenção Corretiva**."
      },
      {
        "titulo": "Documentação necessária",
        "md": "- Contrato assinado (ou minuta + edital).\n- Cronograma físico-financeiro (obras).\n- Atestados de capacidade técnica do tomador.\n- Documentação cadastral/financeira do tomador."
      },
      {
        "titulo": "Checklist de análise",
        "md": "- [ ] Percentual: 5% padrão público; até 10% alta complexidade; até 30% grande vulto com retomada; privado: conforme contrato.\n- [ ] Vigência: prazo contratual + período de observação (mínimo 90 dias após recebimento, ou conforme contrato).\n- [ ] Objeto descrito com precisão (nº do contrato, partes, escopo).\n- [ ] Cláusula de retomada presente? → subscrição diferenciada, escalar se grande vulto.\n- [ ] Previsão de aditivos → alertar sobre endossos futuros.\n- [ ] Compatibilidade técnica e financeira do tomador com o porte do contrato."
      },
      {
        "titulo": "Legislação aplicável",
        "md": "- Lei 14.133/2021, Arts. 96 a 102 (garantias; cláusula de retomada no Art. 102).\n- Lei 8.666/1993, Art. 56 (contratos sob sua regência).\n- Circular SUSEP 662/2022."
      },
      {
        "titulo": "Alertas críticos",
        "md": "- **Aditivo sem endosso = inadimplência contratual.** Monitorar aditivos é tão importante quanto emitir.\n- Apólice vencida durante o contrato → sanções e possível execução da garantia.\n- Recebimento provisório ≠ definitivo: a garantia normalmente só é liberada no definitivo."
      },
      {
        "titulo": "Critérios de subscrição específicos",
        "md": "- Modalidade central da análise técnica: experiência, atestados, cronograma, saúde financeira frente ao contrato.\n- Cláusula de retomada eleva substancialmente a exigência de análise (a seguradora pode ter que concluir a obra).\n- Obras públicas de grande vulto (> R$ 200M) → escalar; possível estruturação (cosseguro só nesses portes)."
      },
      {
        "titulo": "Perguntas frequentes",
        "md": "**P: O contrato foi prorrogado por aditivo. O que fazer?**\nR: Solicitar endosso de prorrogação ANTES do vencimento da apólice. A Traderisk monitora vencimentos e alerta via Portal.\n\n**P: Posso usar uma apólice para vários contratos?**\nR: Não. Cada contrato tem sua apólice, com objeto, IS e prazo próprios."
      },
      {
        "titulo": "Argumentos comerciais",
        "md": "- Exigência habilitante: sem a garantia, não assina o contrato.\n- 5% do contrato sem imobilizar 5% do caixa — preservação direta de capital de giro.\n- Gestão centralizada de todas as apólices por contrato no Portal do Tomador."
      },
      {
        "titulo": "Objeções comuns",
        "md": "**\"A fiança bancária resolve.\"** → Resolve consumindo limite bancário que a empresa precisa para capital de giro, e normalmente a custo maior. O seguro garantia não consome limite e libera o relacionamento bancário para crédito produtivo."
      },
      {
        "titulo": "Conexões",
        "md": "- Fase anterior → **Licitação (BID)**.\n- Antecipação no contrato → **Adiantamento de Pagamento**.\n- Substituir retenções de medição → **Retenção de Pagamento**.\n- Pós-entrega → **Manutenção Corretiva**.\n- Concessões → **Concessões Públicas** (estruturadas)."
      }
    ]
  },
  "adiantamento-de-pagamento": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição e uso",
        "md": "Garante a devolução de valores antecipados pelo contratante ao tomador, caso a obrigação correspondente não seja cumprida. Protege quem paga antes de receber."
      },
      {
        "titulo": "Partes envolvidas",
        "md": "- **Tomador:** contratado que recebe a antecipação.\n- **Segurado:** contratante que antecipa o pagamento.\n- **Objeto:** o valor antecipado vinculado ao contrato específico."
      },
      {
        "titulo": "Quando usar",
        "md": "- Contratos com pagamento antecipado para mobilização de obra.\n- Compra de equipamentos sob encomenda com sinal/antecipação.\n- Fornecimentos com adiantamento para aquisição de insumos.\n- Contratos públicos com antecipação prevista (situações específicas da Lei 14.133/2021)."
      },
      {
        "titulo": "Quando NÃO usar",
        "md": "- Quando não há antecipação financeira (a garantia da obrigação principal é a de Execução).\n- Para garantir o cumprimento integral do contrato → **Execução** (podem coexistir)."
      },
      {
        "titulo": "Documentação necessária",
        "md": "- Contrato com a cláusula de antecipação.\n- Valor e cronograma de amortização do adiantamento.\n- Documentação cadastral/financeira do tomador."
      },
      {
        "titulo": "Checklist de análise",
        "md": "- [ ] IS = 100% do valor antecipado (regra geral).\n- [ ] Mecanismo de amortização do adiantamento nas medições/entregas (permite redução proporcional da IS por endosso, quando previsto).\n- [ ] Vigência ≥ prazo de amortização integral.\n- [ ] Coexistência com apólice de Execução verificada (objetos distintos, sem sobreposição)."
      },
      {
        "titulo": "Legislação aplicável",
        "md": "- Lei 14.133/2021 (antecipação em contratos públicos, quando admitida).\n- Circular SUSEP 662/2022."
      },
      {
        "titulo": "Alertas críticos",
        "md": "- A IS pode ser reduzida conforme o adiantamento é amortizado — endossos de redução economizam prêmio. Monitorar.\n- Inadimplemento parcial: a indenização corresponde ao saldo não amortizado."
      },
      {
        "titulo": "Critérios de subscrição específicos",
        "md": "- Risco direto de crédito: a seguradora avalia o tomador como quem \"recebe dinheiro adiantado\". Análise financeira rigorosa.\n- Destinação do adiantamento (mobilização comprovável reduz risco)."
      },
      {
        "titulo": "Perguntas frequentes",
        "md": "**P: Já tenho apólice de execução. Preciso desta também?**\nR: Se o contrato prevê antecipação e exige garantia específica do adiantamento, sim. São objetos distintos: uma garante o cumprimento do contrato; a outra, a devolução do valor antecipado."
      },
      {
        "titulo": "Argumentos comerciais",
        "md": "- Viabiliza negociar antecipações com clientes (capital de giro do contrato) oferecendo segurança ao contratante."
      },
      {
        "titulo": "Objeções comuns",
        "md": "**\"O cliente confia em mim, não precisa.\"** → A garantia formaliza a confiança e destrava antecipações maiores. É instrumento de negociação comercial, não de desconfiança."
      },
      {
        "titulo": "Conexões",
        "md": "- Sempre avaliar junto com **Execução** no mesmo contrato.\n- Equipamentos importados → considerar **Garantias Aduaneiras** / **Cadeia de Importação**."
      }
    ]
  },
  "manutencao-corretiva": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição e uso",
        "md": "Garante a correção de defeitos, vícios ou falhas identificados no período de garantia pós-entrega da obra, bem ou serviço (assistência técnica corretiva)."
      },
      {
        "titulo": "Partes envolvidas",
        "md": "- **Tomador:** contratado que entregou o objeto.\n- **Segurado:** contratante/proprietário do objeto entregue.\n- **Objeto:** as obrigações de correção no período de garantia do contrato específico."
      },
      {
        "titulo": "Quando usar",
        "md": "- Pós-entrega de obras (período de observação e garantia quinquenal quando exigido contratualmente).\n- Equipamentos industriais com garantia técnica contratual.\n- Contratos que liberam a garantia de execução mediante apresentação de garantia de manutenção."
      },
      {
        "titulo": "Quando NÃO usar",
        "md": "- Durante a execução do contrato → **Execução**.\n- Para garantia legal genérica sem exigência contratual específica."
      },
      {
        "titulo": "Documentação necessária",
        "md": "- Contrato com a cláusula de garantia técnica/manutenção.\n- Termo de recebimento (provisório/definitivo) do objeto.\n- Prazo de garantia exigido."
      },
      {
        "titulo": "Checklist de análise",
        "md": "- [ ] Período de garantia contratual (típico: 12 a 60 meses).\n- [ ] IS conforme contrato (percentual do valor do objeto).\n- [ ] Marco de início (recebimento provisório ou definitivo).\n- [ ] Escopo da manutenção corretiva claramente delimitado (corretiva ≠ preventiva/operação)."
      },
      {
        "titulo": "Legislação aplicável",
        "md": "- Regras contratuais; Lei 14.133/2021 quando público; Código Civil (responsabilidade do construtor, Art. 618) como pano de fundo.\n- Circular SUSEP 662/2022."
      },
      {
        "titulo": "Alertas críticos",
        "md": "- Delimitar o escopo: a apólice cobre correção de defeitos, não operação nem manutenção preventiva.\n- Vigência deve casar com o período de garantia contratual exato."
      },
      {
        "titulo": "Critérios de subscrição específicos",
        "md": "- Qualidade e histórico técnico do tomador no tipo de objeto entregue.\n- Complexidade tecnológica do objeto (equipamentos especiais elevam risco)."
      },
      {
        "titulo": "Perguntas frequentes",
        "md": "**P: Encerrou a obra. A apólice de execução já não basta?**\nR: A de execução cobre o contrato até o recebimento + observação. Se o contrato exige garantia adicional do período de assistência técnica, a Manutenção Corretiva é a modalidade própria — e costuma permitir liberar a garantia de execução."
      },
      {
        "titulo": "Argumentos comerciais",
        "md": "- Permite encerrar formalmente o contrato e liberar a garantia principal, mantendo apenas a cobertura do período de assistência."
      },
      {
        "titulo": "Objeções comuns",
        "md": "**\"Nunca dá problema depois da entrega.\"** → A exigência é do contratante; sem a garantia, retenções ou a apólice de execução ficam presas por todo o período. A modalidade é o caminho mais barato para liberar essas amarras."
      },
      {
        "titulo": "Conexões",
        "md": "- Sucede a **Execução**; pode substituir **Retenção de Pagamento** remanescente."
      }
    ]
  },
  "retencao-de-pagamento": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição e uso",
        "md": "Substitui a retenção contratual de percentual das medições/faturas que o contratante reteria como garantia durante a execução. O tomador recebe 100% das medições; o contratante mantém garantia equivalente via apólice."
      },
      {
        "titulo": "Partes envolvidas",
        "md": "- **Tomador:** contratado que sofreria as retenções.\n- **Segurado:** contratante que liberará os valores retidos (ou deixará de reter).\n- **Objeto:** o valor equivalente às retenções previstas no contrato específico."
      },
      {
        "titulo": "Quando usar",
        "md": "- Contratos de obra/serviço com cláusula de retenção (tipicamente 5% a 10% de cada medição).\n- Liberação de retenções já acumuladas ao longo do contrato."
      },
      {
        "titulo": "Quando NÃO usar",
        "md": "- Contratos sem cláusula de retenção.\n- Para garantir a obrigação principal → **Execução** (podem coexistir)."
      },
      {
        "titulo": "Documentação necessária",
        "md": "- Contrato com a cláusula de retenção.\n- Demonstrativo de retenções já acumuladas (se substituição de saldo).\n- Cronograma de medições futuras."
      },
      {
        "titulo": "Checklist de análise",
        "md": "- [ ] IS = retenções acumuladas + projetadas (ou conforme negociado com o segurado).\n- [ ] Anuência do segurado com a substituição (cláusula contratual ou aditivo).\n- [ ] Vigência até a liberação contratual das retenções (em geral, recebimento definitivo)."
      },
      {
        "titulo": "Legislação aplicável",
        "md": "- Regras contratuais; Lei 14.133/2021 quando contrato público.\n- Circular SUSEP 662/2022."
      },
      {
        "titulo": "Alertas críticos",
        "md": "- A substituição depende de aceitação do contratante — verificar previsão contratual ou negociar aditivo antes de emitir.\n- IS cresce com novas medições se a apólice cobrir retenções futuras — prever endossos."
      },
      {
        "titulo": "Critérios de subscrição específicos",
        "md": "- Performance do contrato até o momento (medições aprovadas sem glosas reduzem risco)."
      },
      {
        "titulo": "Perguntas frequentes",
        "md": "**P: Tenho 8% retido em um contrato de 2 anos. Consigo liberar agora?**\nR: Sim, se o contratante aceitar a substituição pela apólice. É liquidez imediata equivalente ao saldo retido."
      },
      {
        "titulo": "Argumentos comerciais",
        "md": "- Converte retenções paradas em capital de giro imediato — efeito financeiro direto e mensurável."
      },
      {
        "titulo": "Objeções comuns",
        "md": "**\"O contratante não vai aceitar.\"** → A garantia oferecida é equivalente e regulada pela SUSEP; para o contratante o risco é o mesmo, com menos gestão de valores retidos. A Traderisk apoia a argumentação técnica junto ao contratante."
      },
      {
        "titulo": "Conexões",
        "md": "- Coexiste com **Execução** no mesmo contrato.\n- Final do contrato → **Manutenção Corretiva** pode substituir retenções de garantia pós-obra."
      }
    ]
  },
  "deposito-recursal-trabalhista": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição e uso",
        "md": "Apólice que substitui o depósito recursal exigido para interposição de recursos na Justiça do Trabalho (recurso ordinário, recurso de revista, agravo etc.), permitindo recorrer sem imobilizar caixa."
      },
      {
        "titulo": "Partes envolvidas",
        "md": "- **Tomador:** empresa reclamada (ré) que pretende recorrer.\n- **Segurado/beneficiário:** o juízo trabalhista / reclamante (conforme estrutura exigida pelo tribunal).\n- **Objeto:** o valor do depósito recursal exigido para o recurso específico, no processo específico."
      },
      {
        "titulo": "Quando usar — situações típicas",
        "md": "- Condenação em 1ª instância e a empresa quer interpor recurso ordinário.\n- Recurso de revista ao TST.\n- Empresas com alto volume de ações trabalhistas que querem preservar caixa em todos os recursos.\n- Substituição de depósitos recursais já realizados em dinheiro (mediante pedido nos autos)."
      },
      {
        "titulo": "Quando NÃO usar",
        "md": "- Processo já em **execução** → modalidade correta é Judicial Trabalhista (execução).\n- Cliente no polo ativo (reclamante) → não há o que garantir.\n- Entidades isentas de depósito recursal (beneficiárias de justiça gratuita, entes públicos com prerrogativas) → verificar se há exigência antes de cotar."
      },
      {
        "titulo": "Documentação necessária",
        "md": "- Número do processo (CNJ), vara e tribunal.\n- Cópia da decisão/condenação e do valor do depósito exigido.\n- Prazo do recurso (data-limite).\n- Documentação cadastral/financeira do tomador (se ainda sem limite aprovado)."
      },
      {
        "titulo": "Checklist de análise antes de cotar",
        "md": "- [ ] Fase processual confirmada: recurso (não execução).\n- [ ] Valor: condenação limitada ao **teto do depósito recursal fixado pelo TST** (atualizado periodicamente — confirmar valor vigente). Acréscimo de 30% conforme exigência aplicável (Ato Conjunto TST.CSJT.CGJT nº 1/2019 e atualizações).\n- [ ] Prazo do recurso: a apólice DEVE estar emitida e protocolada dentro do prazo recursal. Prazo processual é intransponível.\n- [ ] Exigências do tribunal: vigência mínima (referência: 3 anos), renovação automática/compromisso de renovação, cláusula de incontestabilidade.\n- [ ] Tomador: sem RJ, com limite aprovado ou documentação para aprovação expressa."
      },
      {
        "titulo": "Legislação aplicável",
        "md": "- CLT, Art. 899, §11 (substituição do depósito recursal por seguro garantia — Lei 13.467/2017).\n- Ato Conjunto TST.CSJT.CGJT nº 1/2019 (e atualizações) — requisitos da apólice na JT.\n- OJ 59 da SBDI-2 do TST.\n- Circular SUSEP 662/2022."
      },
      {
        "titulo": "Alertas críticos",
        "md": "- **Prazo do recurso**: emitir com antecedência; não deixar para o último dia.\n- **Renovação**: a apólice deve permanecer vigente até o desfecho. Vencimento sem renovação pode levar à deserção do recurso ou execução da garantia.\n- **Teto do TST**: usar o valor vigente na data; valores são atualizados periodicamente.\n- **Falta de planejamento impede o uso** — o tomador sem cadastro/limite aprovado pode não conseguir emitir a tempo. Orientar aprovação prévia de limite para empresas com passivo trabalhista recorrente."
      },
      {
        "titulo": "Critérios de subscrição específicos",
        "md": "- Modalidade de menor ticket e alto volume — apetite amplo no mercado.\n- Perfis padrão: emissão digital rápida (Motor Judicial V4 / Portal do Tomador, sem burocracia).\n- Volume de ações da empresa é avaliado para dimensionar o limite."
      },
      {
        "titulo": "Perguntas frequentes",
        "md": "**P: Já fiz o depósito em dinheiro. Posso trocar pela apólice e recuperar o valor?**\nR: Em muitos casos sim, mediante pedido de substituição nos autos. O juízo aprecia. A Traderisk prepara a apólice e orienta a documentação.\n\n**P: Quanto tempo leva para emitir?**\nR: Para perfis padrão com limite aprovado, a emissão é digital e rápida pelo Portal. Sem cadastro prévio, depende da aprovação do limite — por isso a importância do planejamento.\n\n**P: A apólice cobre vários processos?**\nR: Não. Cada apólice cobre um depósito recursal de um recurso em um processo específico."
      },
      {
        "titulo": "Argumentos comerciais",
        "md": "- Cada recurso deixa de imobilizar caixa no teto do depósito (valor relevante multiplicado pelo volume de ações).\n- Empresa com passivo trabalhista recorrente transforma depósitos em custo de prêmio — fração do valor imobilizado.\n- Emissão digital na ponta: autonomia do jurídico/financeiro sem fluxo de e-mails."
      },
      {
        "titulo": "Objeções comuns",
        "md": "**\"O juiz pode recusar a apólice.\"** → A substituição tem previsão expressa na CLT (Art. 899, §11) e regulamentação do TST. Cumprindo os requisitos formais (incontestabilidade, vigência, acréscimo), a aceitação é a regra consolidada.\n\n**\"É mais um custo.\"** → É a troca de capital imobilizado (100% do depósito) por um prêmio percentual. O caixa liberado vale mais do que o prêmio na quase totalidade dos cenários."
      },
      {
        "titulo": "Conexões com outras modalidades",
        "md": "- Processo avançou para execução → **Judicial Trabalhista**.\n- Empresa também tem execuções fiscais → **Judicial Fiscal**.\n- Empresa contrata com setor público → apresentar **Garantias de Licitação/Execução**."
      }
    ]
  },
  "judicial-trabalhista": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição e uso",
        "md": "Apólice que garante o juízo trabalhista em **fase de execução ou cumprimento de sentença**, substituindo penhora de bens, bloqueio de contas (Sisbajud) ou depósito em dinheiro."
      },
      {
        "titulo": "Partes envolvidas",
        "md": "- **Tomador:** empresa executada.\n- **Segurado:** juízo trabalhista / exequente.\n- **Objeto:** o débito em execução no processo específico, acrescido do percentual exigido."
      },
      {
        "titulo": "Quando usar",
        "md": "- Execução definitiva ou provisória de sentença trabalhista.\n- Substituição de penhora já efetivada (bens, faturamento, contas).\n- Liberação de valores bloqueados via Sisbajud mediante oferecimento da apólice.\n- Garantia do juízo para opor embargos à execução."
      },
      {
        "titulo": "Quando NÃO usar",
        "md": "- Fase de **recurso** (antes da execução) → modalidade correta é **Depósito Recursal Trabalhista**.\n- Cliente no polo ativo.\n- Acordo já homologado com pagamento parcelado direto (não há garantia a constituir, salvo exigência do juízo)."
      },
      {
        "titulo": "Documentação necessária",
        "md": "- Número do processo, vara, fase exata.\n- Cálculo/valor atualizado do débito em execução.\n- Decisão que determinou a garantia ou penhora (se houver).\n- Documentação cadastral/financeira do tomador."
      },
      {
        "titulo": "Checklist de análise",
        "md": "- [ ] IS = débito atualizado + 30% (CLT, Art. 882 c/c CPC, Art. 835, §2º; confirmar exigência do juízo).\n- [ ] Cláusula de incontestabilidade.\n- [ ] Vigência conforme exigência do juízo (referência JT: mínimo 3 anos + renovação).\n- [ ] Existência de bloqueio/penhora a substituir — estratégia de substituição mapeada com o advogado.\n- [ ] Situação financeira do tomador: em execução avançada a análise é mais criteriosa (risco já materializado).\n- [ ] Tomador sem RJ."
      },
      {
        "titulo": "Legislação aplicável",
        "md": "- CLT, Art. 882 (redação da Lei 13.467/2017).\n- CPC/2015, Art. 835, §2º e Art. 848, parágrafo único.\n- Ato Conjunto TST.CSJT.CGJT nº 1/2019 (e atualizações).\n- Circular SUSEP 662/2022."
      },
      {
        "titulo": "Alertas críticos",
        "md": "- Subscrição mais criteriosa que no depósito recursal — o risco de pagamento é mais próximo.\n- Renovação até a extinção da execução é obrigatória; vencimento pode gerar ordem de pagamento imediato ou nova constrição.\n- Em execução provisória, acompanhar o desfecho do recurso pendente."
      },
      {
        "titulo": "Critérios de subscrição específicos",
        "md": "- Probabilidade de êxito dos embargos/defesa (algumas seguradoras pedem parecer).\n- Valor do débito vs. capacidade do tomador.\n- Histórico de acordos e pagamentos do tomador na JT."
      },
      {
        "titulo": "Perguntas frequentes",
        "md": "**P: Minha conta foi bloqueada pelo Sisbajud. A apólice libera o valor?**\nR: É possível requerer a substituição do bloqueio pela apólice. O juízo decide. É uma das aplicações mais valiosas da modalidade — recuperar liquidez imediatamente.\n\n**P: O exequente pode recusar a apólice?**\nR: Pode impugnar, mas a equiparação a dinheiro (CPC, Art. 835, §2º, com o acréscimo de 30%) é o fundamento que sustenta a aceitação. A decisão é do juízo."
      },
      {
        "titulo": "Argumentos comerciais",
        "md": "- Liberação de caixa bloqueado e de bens penhorados — impacto financeiro imediato.\n- Permite discutir o débito (embargos) sem paralisar a operação da empresa."
      },
      {
        "titulo": "Objeções comuns",
        "md": "**\"Já estou em execução, nenhuma seguradora vai aprovar.\"** → A análise é mais criteriosa, não impossível. A Traderisk opera com 40+ seguradoras e direciona para quem tem apetite no perfil. O que inviabiliza é RJ ou incapacidade financeira evidente."
      },
      {
        "titulo": "Conexões",
        "md": "- Fase anterior (recurso) → **Depósito Recursal Trabalhista**.\n- Débitos fiscais da mesma empresa → **Judicial Fiscal**.\n- Execuções cíveis → **Judicial Civil**."
      }
    ]
  },
  "judicial-civil": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição e uso",
        "md": "Apólice que garante o juízo em **processos cíveis**, substituindo penhora, depósito em dinheiro ou outras formas de caução. Equiparada a dinheiro para fins de penhora quando emitida com acréscimo de 30% (CPC, Art. 835, §2º)."
      },
      {
        "titulo": "Partes envolvidas",
        "md": "- **Tomador:** réu/executado/devedor no processo cível.\n- **Segurado:** juízo / credor (exequente).\n- **Objeto:** o débito ou a caução exigida no processo específico."
      },
      {
        "titulo": "Quando usar",
        "md": "- Execução de título extrajudicial (duplicatas, contratos, cédulas).\n- Cumprimento de sentença cível.\n- Substituição de penhora de bens, faturamento ou valores.\n- Caução em tutelas de urgência ou cautelares.\n- Garantia para efeito suspensivo em embargos.\n- Ações monitórias e de cobrança em fase de constrição."
      },
      {
        "titulo": "Quando NÃO usar",
        "md": "- Disputas trabalhistas → grupo trabalhista.\n- Débitos tributários em execução fiscal → **Judicial Fiscal**.\n- Procedimento arbitral → **Garantia de Arbitragem** (grupo financeiras)."
      },
      {
        "titulo": "Documentação necessária",
        "md": "- Número do processo, vara/foro.\n- Valor atualizado do débito ou da caução fixada.\n- Decisão que exigiu a garantia (se houver).\n- Documentação do tomador (PJ ou PF — PF é possível nesta modalidade, sujeita a análise)."
      },
      {
        "titulo": "Checklist de análise",
        "md": "- [ ] IS = débito + 30% (Art. 835, §2º) ou valor fixado pelo juízo.\n- [ ] Cláusula de incontestabilidade.\n- [ ] Vigência e renovação conforme exigência do juízo (referência usual: 1 a 3 anos renováveis até a extinção).\n- [ ] Natureza do crédito exequendo (títulos bancários e perfis de credor influenciam apetite).\n- [ ] Existência de constrição prévia a substituir.\n- [ ] Tomador sem RJ."
      },
      {
        "titulo": "Legislação aplicável",
        "md": "- CPC/2015: Art. 835, §2º (equiparação a dinheiro); Art. 848, parágrafo único (substituição de penhora); Art. 300, §1º (caução em tutela de urgência).\n- Circular SUSEP 662/2022."
      },
      {
        "titulo": "Alertas críticos",
        "md": "- O acréscimo de 30% é requisito da equiparação a dinheiro — apólice sem o acréscimo enfraquece o pedido de substituição.\n- Renovar até a extinção. Vencimento sem renovação: risco de execução da apólice ou nova penhora.\n- Pedido de substituição de penhora pode ser impugnado pelo credor — alinhar estratégia com o advogado."
      },
      {
        "titulo": "Critérios de subscrição específicos",
        "md": "- Mérito e fase da discussão (probabilidade de derrota próxima eleva risco).\n- Perfil do credor (bancos exequentes costumam impugnar mais).\n- Em PF: patrimônio e renda comprovados."
      },
      {
        "titulo": "Perguntas frequentes",
        "md": "**P: Pessoa física pode contratar?**\nR: Sim. Funciona como alternativa ao depósito, sujeita a análise de crédito da seguradora.\n\n**P: O credor é obrigado a aceitar?**\nR: A decisão é do juízo. A equiparação legal a dinheiro (com o acréscimo de 30%) é o fundamento central; a jurisprudência majoritária prestigia a substituição."
      },
      {
        "titulo": "Argumentos comerciais",
        "md": "- Desbloqueio de ativos penhorados e preservação do capital de giro durante a disputa.\n- Permite litigar sem sufocar a operação."
      },
      {
        "titulo": "Objeções comuns",
        "md": "**\"Prefiro deixar o dinheiro depositado, é mais simples.\"** → O depósito imobiliza 100% do valor por anos, com remuneração inferior ao custo de capital da empresa. A apólice custa uma fração disso ao ano e libera o valor para a operação."
      },
      {
        "titulo": "Conexões",
        "md": "- Débito tributário → **Judicial Fiscal**.\n- Justiça do Trabalho → grupo trabalhista.\n- Arbitragem → **Garantia de Arbitragem**."
      }
    ]
  },
  "judicial-fiscal": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição e uso",
        "md": "Apólice que garante débitos tributários em **execução fiscal** ou discussão judicial, perante Fazenda Nacional, Estadual ou Municipal. Permite discutir o débito (embargos), obter certidão positiva com efeito de negativa (CPEN) e evitar constrições."
      },
      {
        "titulo": "Partes envolvidas",
        "md": "- **Tomador:** contribuinte executado/devedor tributário.\n- **Segurado:** Fazenda credora (União/PGFN, Estado/PGE, Município/PGM) / juízo.\n- **Objeto:** o débito inscrito ou em execução, no processo específico."
      },
      {
        "titulo": "Quando usar",
        "md": "- Execução fiscal federal (dívida ativa da União) — regulamentada pela PGFN.\n- Execuções fiscais estaduais e municipais — conforme regulamentação do ente.\n- Garantia para oposição de embargos à execução fiscal.\n- Garantia antecipada de débito para obtenção de CPEN.\n- Substituição de penhora ou depósito em execução fiscal."
      },
      {
        "titulo": "Quando NÃO usar",
        "md": "- Parcelamentos administrativos (sem processo judicial) → **Parcelamento Fiscal** (grupo estruturadas).\n- Discussão administrativa de crédito → **Créditos Tributários** (grupo estruturadas).\n- Débitos não tributários cíveis → **Judicial Civil**."
      },
      {
        "titulo": "Documentação necessária",
        "md": "- Número da execução fiscal / CDA (Certidão de Dívida Ativa).\n- Valor atualizado do débito.\n- Ente credor (define a regulamentação aplicável).\n- Documentação cadastral e financeira do tomador."
      },
      {
        "titulo": "Checklist de análise",
        "md": "- [ ] Ente credor identificado → **verificar regulamentação local** (federal: Portaria PGFN 164/2014 e normas posteriores; estados e municípios: norma própria — confirmar antes de orientar).\n- [ ] IS conforme exigência do ente (regra federal de referência: débito + encargos; verificar percentual de acréscimo exigido pela norma vigente do ente).\n- [ ] Cláusula de incontestabilidade e demais cláusulas obrigatórias do modelo do ente (PGFN publica requisitos e, em alguns casos, modelo de apólice).\n- [ ] Vigência e renovação: até a extinção da execução; alguns entes exigem prazos mínimos específicos.\n- [ ] Tomador sem RJ; situação fiscal global avaliada (outras CDAs elevam o risco)."
      },
      {
        "titulo": "Legislação aplicável",
        "md": "- Lei 6.830/1980 (LEF), Art. 9º, II — seguro garantia como garantia da execução fiscal.\n- Portaria PGFN nº 164/2014 (esfera federal) e atualizações posteriores da PGFN — confirmar norma vigente.\n- CPC/2015, Art. 835, §2º (aplicação subsidiária).\n- Regulamentações estaduais (PGEs) e municipais (PGMs) — variam por ente.\n- Circular SUSEP 662/2022."
      },
      {
        "titulo": "Alertas críticos",
        "md": "- **A aceitação varia por ente.** O que vale para a PGFN não vale automaticamente para um estado ou município. NUNCA garantir aceitação sem verificar a norma local — na dúvida, escalar para a equipe técnica Traderisk.\n- Requisitos formais dos modelos oficiais (quando existem) devem ser seguidos à risca — apólice fora do modelo é rejeitada.\n- Renovação obrigatória; vencimento pode gerar conversão em depósito ou penhora imediata."
      },
      {
        "titulo": "Critérios de subscrição específicos",
        "md": "- Valor e quantidade de CDAs do tomador (passivo fiscal total).\n- Tese em discussão (teses consolidadas a favor do contribuinte reduzem risco percebido).\n- Modalidade de maior criticidade na subscrição entre as judiciais — o credor é a Fazenda, com prerrogativas de cobrança."
      },
      {
        "titulo": "Perguntas frequentes",
        "md": "**P: A apólice me dá certidão negativa?**\nR: A garantia integral do débito em execução permite requerer a CPEN (certidão positiva com efeitos de negativa), essencial para licitações e crédito. A expedição depende do atendimento dos requisitos do ente.\n\n**P: Serve para execução fiscal do meu município?**\nR: Depende da regulamentação municipal. A Traderisk verifica a norma local antes de orientar."
      },
      {
        "titulo": "Argumentos comerciais",
        "md": "- Discutir o débito sem depositar — preservação de caixa em valores tipicamente altos.\n- CPEN viabiliza participação em licitações e operações de crédito durante a discussão.\n- Evita penhora de faturamento e bloqueios que paralisam a operação."
      },
      {
        "titulo": "Objeções comuns",
        "md": "**\"A Fazenda nunca aceita seguro.\"** → A LEF prevê expressamente (Art. 9º, II) e a PGFN regulamenta a aceitação na esfera federal. Em estados e municípios, a aceitação depende da norma local — que a Traderisk verifica caso a caso."
      },
      {
        "titulo": "Conexões",
        "md": "- Parcelamento administrativo → **Parcelamento Fiscal**.\n- Discussão administrativa (CARF) → **Créditos Tributários**.\n- Outras execuções → **Judicial Civil** / **Judicial Trabalhista**."
      }
    ]
  },
  "concessoes-publicas": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição e uso",
        "md": "Garante as obrigações do concessionário perante o poder concedente em contratos de concessão, PPPs e contratos de infraestrutura de longo prazo (rodovias, saneamento, energia, aeroportos, iluminação pública etc.)."
      },
      {
        "titulo": "Partes envolvidas",
        "md": "- **Tomador:** concessionária/SPE.\n- **Segurado:** poder concedente (União, estado, município, agência).\n- **Objeto:** obrigações do contrato de concessão (investimentos, indicadores de desempenho, outorga)."
      },
      {
        "titulo": "Quando usar",
        "md": "- Assinatura de contrato de concessão ou PPP com exigência de garantia de execução.\n- Garantia de proposta em leilões de concessão.\n- Reforço/recomposição de garantia ao longo da concessão (fases de investimento)."
      },
      {
        "titulo": "Quando NÃO usar",
        "md": "- Obras públicas convencionais (sem concessão) → **Execução**."
      },
      {
        "titulo": "Documentação necessária",
        "md": "- Edital do leilão e minuta/contrato de concessão.\n- Plano de negócios/cronograma de investimentos da SPE.\n- Estrutura societária e suporte dos acionistas (equity support)."
      },
      {
        "titulo": "Checklist de análise",
        "md": "- [ ] Percentual e base da garantia conforme contrato de concessão (frequentemente escalonada por fase).\n- [ ] Prazo da concessão (20–35 anos) → estratégia de apólices renováveis desde o início.\n- [ ] Mecanismos de step-in e caducidade no contrato.\n- [ ] Valor da operação: acima de R$ 200M → possível cosseguro; SEMPRE escalar."
      },
      {
        "titulo": "Legislação aplicável",
        "md": "- Lei 8.987/1995 (concessões), Lei 11.079/2004 (PPPs), Lei 14.133/2021 (subsidiária).\n- Circular SUSEP 662/2022."
      },
      {
        "titulo": "Alertas críticos",
        "md": "- Garantias escalonadas: recomposições e reforços previstos no contrato exigem gestão ativa por décadas.\n- SPE recém-criada: a subscrição olha os sponsors (acionistas) — suporte formal pode ser exigido."
      },
      {
        "titulo": "Critérios de subscrição",
        "md": "- Qualidade dos sponsors, funding do projeto (financiamento fechado?), matriz de riscos do contrato.\n- Comitê de subscrição na seguradora; prazos de análise maiores."
      },
      {
        "titulo": "FAQ",
        "md": "**P: A SPE não tem balanço. Como aprova?**\nR: A análise recai sobre os acionistas e o project finance. Estruturação dedicada — a equipe técnica Traderisk conduz."
      },
      {
        "titulo": "Argumentos comerciais",
        "md": "- Em concessões, a garantia é condição de assinatura e de manutenção do contrato; gestão profissional evita caducidade e sanções por garantia irregular."
      },
      {
        "titulo": "Objeções",
        "md": "**\"O banco do projeto resolve com fiança.\"** → A fiança consome o limite que o projeto precisa para o capex. O seguro preserva a capacidade de financiamento."
      },
      {
        "titulo": "Conexões",
        "md": "- Obras da concessão → **Execução** / **Completion Bond**.\n- Energia → **Compra de Energia**."
      }
    ]
  },
  "completion-bond": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição e uso",
        "md": "Garante ao financiador (banco, fundo, debenturistas) que o projeto/obra será concluído conforme escopo, prazo e orçamento. Exigida em project finance e financiamentos estruturados."
      },
      {
        "titulo": "Partes envolvidas",
        "md": "- **Tomador:** SPE/empresa que executa o projeto.\n- **Segurado:** financiador do projeto.\n- **Objeto:** a conclusão do projeto específico (completion físico e, conforme desenho, financeiro)."
      },
      {
        "titulo": "Quando usar",
        "md": "- Projetos de energia (eólica, solar, térmica), mineração, grandes plantas industriais.\n- Financiamentos com covenants de conclusão.\n- Emissões de dívida (debêntures de infraestrutura) com exigência de garantia de conclusão."
      },
      {
        "titulo": "Quando NÃO usar",
        "md": "- Contratos de obra comuns sem financiador exigindo conclusão → **Execução**."
      },
      {
        "titulo": "Documentação necessária",
        "md": "- Contrato de financiamento e term sheet.\n- EPC/contratos de construção, cronograma e orçamento.\n- Estudos do projeto (engenharia, licenças)."
      },
      {
        "titulo": "Checklist de análise",
        "md": "- [ ] Definição contratual de \"conclusão\" (completion físico/financeiro/operacional).\n- [ ] Matriz de riscos do EPC (preço fechado? turn-key?).\n- [ ] Prazo e marcos do cronograma.\n- [ ] Porte: operações relevantes → escalar; acima de R$ 200M → possível cosseguro."
      },
      {
        "titulo": "Legislação aplicável",
        "md": "- Circular SUSEP 662/2022; arcabouço contratual do financiamento."
      },
      {
        "titulo": "Alertas críticos",
        "md": "- Modalidade de altíssima complexidade — SEMPRE conduzida pela equipe técnica Traderisk.\n- A definição de conclusão delimita o risco; ambiguidade contratual é o maior problema."
      },
      {
        "titulo": "Critérios de subscrição",
        "md": "- Experiência do EPCista, robustez do orçamento, contingências, licenças, sponsors."
      },
      {
        "titulo": "FAQ",
        "md": "**P: É a mesma coisa que performance bond?**\nR: Não. O performance (Execução) garante o contratante da obra; o completion garante o FINANCIADOR de que o projeto será concluído. Beneficiários e gatilhos diferentes."
      },
      {
        "titulo": "Argumentos comerciais",
        "md": "- Destrava o financiamento: sem a garantia de conclusão, o funding não fecha."
      },
      {
        "titulo": "Objeções",
        "md": "**\"O EPC turn-key já protege.\"** → Protege a SPE contra o EPCista; o financiador quer proteção sobre o projeto como um todo — papel do completion bond."
      },
      {
        "titulo": "Conexões",
        "md": "- **Execução** (contratos EPC), **Concessões**, **Energia**, grupo **financeiras** (CRA/CRI/Debêntures)."
      }
    ]
  },
  "energia": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição e uso",
        "md": "Garante obrigações financeiras em contratos de compra e venda de energia elétrica — principalmente no ACL (Ambiente de Contratação Livre) — e obrigações setoriais (CCEE, leilões)."
      },
      {
        "titulo": "Partes envolvidas",
        "md": "- **Tomador:** comprador (consumidor livre/comercializadora) ou vendedor, conforme a obrigação garantida.\n- **Segurado:** contraparte do contrato (geradora, comercializadora) ou entidade setorial.\n- **Objeto:** obrigações de pagamento do contrato de energia específico (CCEAL/CCEAR) ou aportes de garantia setorial."
      },
      {
        "titulo": "Quando usar",
        "md": "- Garantia de pagamento em contratos bilaterais no ACL.\n- Garantias exigidas em leilões e na liquidação da CCEE (conforme regras vigentes).\n- Migração de consumidores para o mercado livre com exigência de garantia da supridora."
      },
      {
        "titulo": "Quando NÃO usar",
        "md": "- Construção de usinas → **Execução** / **Completion Bond**.\n- Concessões de distribuição/transmissão → **Concessões Públicas**."
      },
      {
        "titulo": "Documentação necessária",
        "md": "- Contrato de energia (CCEAL) com volumes, preços e prazo.\n- Exigência de garantia da contraparte (nº de meses de suprimento, fórmula)."
      },
      {
        "titulo": "Checklist de análise",
        "md": "- [ ] IS conforme fórmula contratual (comum: 1 a 6 meses de faturamento estimado).\n- [ ] Prazo do contrato e reajustes (PLD/indexadores) → endossos de IS.\n- [ ] Regras setoriais aplicáveis (CCEE) quando a garantia for setorial."
      },
      {
        "titulo": "Legislação aplicável",
        "md": "- Marco setorial elétrico (Lei 9.074/1995, Lei 10.848/2004) e regras CCEE/ANEEL aplicáveis.\n- Circular SUSEP 662/2022."
      },
      {
        "titulo": "Alertas críticos",
        "md": "- Volatilidade de preços pode alterar a exigência de garantia — gestão ativa de endossos.\n- Verificar regras vigentes da CCEE para garantias setoriais (mudam com frequência)."
      },
      {
        "titulo": "Critérios de subscrição",
        "md": "- Risco de crédito do tomador e exposição ao PLD; comercializadoras têm análise mais criteriosa."
      },
      {
        "titulo": "FAQ",
        "md": "**P: Migrei para o mercado livre e a supridora exige garantia. O seguro serve?**\nR: Sim, é uso típico — substitui depósito ou fiança exigidos pela supridora."
      },
      {
        "titulo": "Argumentos comerciais",
        "md": "- Viabiliza contratos no ACL sem travar caixa nem limite bancário em garantias de suprimento."
      },
      {
        "titulo": "Objeções",
        "md": "**\"A comercializadora só aceita fiança.\"** → O seguro garantia entrega proteção equivalente regulada pela SUSEP; a aceitação é negociada e cada vez mais comum no setor."
      },
      {
        "titulo": "Conexões",
        "md": "- Construção de ativos → **Completion Bond**. Concessões do setor → **Concessões Públicas**."
      }
    ]
  },
  "creditos-tributarios": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição e uso",
        "md": "Garante a devolução de valores em discussões administrativas envolvendo créditos tributários — compensações, ressarcimentos e habilitações de crédito — caso a decisão final seja desfavorável ao contribuinte."
      },
      {
        "titulo": "Partes envolvidas",
        "md": "- **Tomador:** contribuinte titular do crédito em discussão.\n- **Segurado:** Fazenda (RFB/PGFN ou ente competente).\n- **Objeto:** o crédito tributário específico em discussão/compensação."
      },
      {
        "titulo": "Quando usar",
        "md": "- Compensações de créditos em discussão com exigência de garantia.\n- Ressarcimentos antecipados condicionados a garantia.\n- Hipóteses normativas específicas em que a RFB/PGFN admite garantia para fruição de crédito controvertido."
      },
      {
        "titulo": "Quando NÃO usar",
        "md": "- Débito em execução fiscal → **Judicial Fiscal**.\n- Parcelamento → **Parcelamento Fiscal**."
      },
      {
        "titulo": "Documentação necessária",
        "md": "- Processo administrativo / PER-DCOMP / ato da discussão.\n- Memória de cálculo do crédito."
      },
      {
        "titulo": "Checklist de análise",
        "md": "- [ ] Hipótese normativa que admite a garantia (verificar norma específica — nem toda discussão comporta).\n- [ ] IS = crédito + acréscimos conforme a norma.\n- [ ] Prazo estimado da discussão (CARF pode levar anos) → renovações."
      },
      {
        "titulo": "Legislação aplicável",
        "md": "- Normas da RFB/PGFN aplicáveis à hipótese específica; CTN como pano de fundo.\n- Circular SUSEP 662/2022."
      },
      {
        "titulo": "Alertas críticos",
        "md": "- Modalidade de enquadramento normativo fino — SEMPRE validar a hipótese com a equipe técnica antes de qualquer sinalização ao cliente."
      },
      {
        "titulo": "Critérios de subscrição",
        "md": "- Solidez da tese do crédito e porte do contribuinte; subscrição criteriosa."
      },
      {
        "titulo": "FAQ",
        "md": "**P: Posso usar o crédito imediatamente com a apólice?**\nR: Apenas nas hipóteses em que a norma admite a garantia para fruição antecipada. Verificação caso a caso."
      },
      {
        "titulo": "Argumentos comerciais",
        "md": "- Antecipação do uso de créditos relevantes sem aguardar anos de discussão — efeito direto no caixa."
      },
      {
        "titulo": "Objeções",
        "md": "**\"É arriscado, se eu perder pago tudo.\"** → A obrigação de devolver existe com ou sem apólice; a garantia apenas viabiliza a fruição antecipada. A decisão de usar o crédito é estratégia tributária do contribuinte com seus assessores."
      },
      {
        "titulo": "Conexões",
        "md": "- Judicializou → **Judicial Fiscal**. Parcelou → **Parcelamento Fiscal**."
      }
    ]
  },
  "aduaneiras": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição e uso",
        "md": "Garante obrigações tributárias e regulatórias perante a Receita Federal em operações de comércio exterior e regimes aduaneiros especiais."
      },
      {
        "titulo": "Partes envolvidas",
        "md": "- **Tomador:** importador/exportador/beneficiário do regime.\n- **Segurado:** União (Receita Federal do Brasil).\n- **Objeto:** tributos suspensos ou obrigações do regime específico."
      },
      {
        "titulo": "Quando usar",
        "md": "- Regimes especiais: admissão temporária, entreposto aduaneiro, RECOF, Drawback (modalidades com exigência de garantia), trânsito aduaneiro.\n- Liberação de mercadorias retidas mediante garantia (canal cinza, exigências fiscais).\n- Discussões aduaneiras com exigência de garantia."
      },
      {
        "titulo": "Quando NÃO usar",
        "md": "- Execução fiscal já judicializada → **Judicial Fiscal**.\n- Garantias comerciais entre importador e exportador → **Cadeia de Importação/Exportação** (financeiras)."
      },
      {
        "titulo": "Documentação necessária",
        "md": "- Ato/declaração do regime (DI/DUIMP, ato concessório).\n- Cálculo dos tributos suspensos.\n- Documentação cadastral/financeira do tomador."
      },
      {
        "titulo": "Checklist de análise",
        "md": "- [ ] IS = tributos suspensos + acréscimos conforme exigência da RFB.\n- [ ] Prazo do regime e prorrogações possíveis.\n- [ ] Modelo de apólice e requisitos normativos da RFB para a hipótese específica."
      },
      {
        "titulo": "Legislação aplicável",
        "md": "- Regulamento Aduaneiro (Decreto 6.759/2009) e atos normativos da RFB aplicáveis à hipótese.\n- Circular SUSEP 662/2022."
      },
      {
        "titulo": "Alertas críticos",
        "md": "- Cada hipótese aduaneira tem norma própria — verificar o ato normativo aplicável antes de orientar. Na dúvida, escalar.\n- Prorrogação do regime exige endosso tempestivo."
      },
      {
        "titulo": "Critérios de subscrição",
        "md": "- Histórico de comércio exterior do tomador e regularidade fiscal."
      },
      {
        "titulo": "FAQ",
        "md": "**P: Minha carga está retida. A apólice libera?**\nR: Em hipóteses com previsão normativa de garantia, sim — mediante aceitação da RFB. A Traderisk verifica a hipótese e o modelo exigido."
      },
      {
        "titulo": "Argumentos comerciais",
        "md": "- Libera mercadoria e fluxo logístico sem depósito integral dos tributos."
      },
      {
        "titulo": "Objeções",
        "md": "**\"A Receita só aceita depósito.\"** → Há hipóteses normativas expressas de aceitação de seguro garantia. O ponto é enquadrar corretamente a hipótese — análise que a Traderisk faz."
      },
      {
        "titulo": "Conexões",
        "md": "- Judicializou → **Judicial Fiscal**. Comercial da cadeia → **Importação/Exportação** (financeiras)."
      }
    ]
  },
  "imobiliarias-fianca-locaticia": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição e uso",
        "md": "Garante obrigações de contratos imobiliários corporativos — principalmente o pagamento de aluguéis e encargos em locações PJ — substituindo fiança bancária, caução ou fiador."
      },
      {
        "titulo": "Partes envolvidas",
        "md": "- **Tomador:** locatária PJ (ou parte obrigada no contrato imobiliário).\n- **Segurado:** locador/proprietário/fundo imobiliário.\n- **Objeto:** obrigações pecuniárias do contrato de locação/imobiliário específico."
      },
      {
        "titulo": "Quando usar",
        "md": "- Locação de armazéns, galpões logísticos e edifícios comerciais.\n- Lajes corporativas.\n- Built to Suit (BTS) e Build to Suit.\n- Sale & Leaseback (garantia das obrigações de locação pós-venda)."
      },
      {
        "titulo": "Quando NÃO usar",
        "md": "- Locação residencial pessoa física (produto distinto, fora do foco Traderisk).\n- Garantir a construção do BTS em si → avaliar **Execução** ou **Completion Bond** conforme o desenho."
      },
      {
        "titulo": "Documentação necessária",
        "md": "- Contrato de locação (ou minuta) com valores, prazo e cláusula de garantia.\n- Documentação cadastral/financeira da locatária."
      },
      {
        "titulo": "Checklist de análise",
        "md": "- [ ] IS conforme exigência do locador (comum: 6 a 24 meses de aluguel + encargos).\n- [ ] Prazo do contrato (BTS típico: 10–20 anos) → estratégia de apólices renováveis.\n- [ ] Multas e cláusulas de denúncia antecipada (impactam o risco).\n- [ ] Aceitação do locador ao seguro garantia (fundos costumam ter modelos próprios)."
      },
      {
        "titulo": "Legislação aplicável",
        "md": "- Lei 8.245/1991 (Lei do Inquilinato) — seguro como modalidade de garantia locatícia (Art. 37).\n- Circular SUSEP 662/2022."
      },
      {
        "titulo": "Alertas críticos",
        "md": "- Contratos longos: renovação anual/bienal da apólice com compromisso de renovação — monitorar como nas judiciais.\n- Reajustes do aluguel → endossos de IS."
      },
      {
        "titulo": "Critérios de subscrição",
        "md": "- Saúde financeira da locatária e relevância do aluguel sobre sua geração de caixa.\n- Qualidade do contrato (multas, prazo, finalidade do imóvel)."
      },
      {
        "titulo": "FAQ",
        "md": "**P: O locador exige fiança bancária. Posso oferecer seguro?**\nR: A Lei do Inquilinato admite o seguro como garantia. A aceitação é negociada — a Traderisk apoia com a argumentação técnica e o modelo de apólice."
      },
      {
        "titulo": "Argumentos comerciais",
        "md": "- Libera limite bancário da fiança e elimina caução parada por anos em contratos longos."
      },
      {
        "titulo": "Objeções",
        "md": "**\"Fundos imobiliários não aceitam.\"** → Grandes locadores institucionais já operam com seguro garantia regularmente; a questão é atender ao modelo e rating exigidos — direcionamento que a Traderisk faz."
      },
      {
        "titulo": "Conexões",
        "md": "- Construção do BTS → **Completion Bond** / **Execução**.\n- Obrigações financeiras do mesmo grupo → grupo **financeiras** (Built-to-Suit/S&LB financeiro)."
      }
    ]
  },
  "parcelamento-fiscal": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição e uso",
        "md": "Garante débitos tributários incluídos em programas de parcelamento (transações tributárias, parcelamentos especiais) quando o programa exige garantia, substituindo depósito ou fiança."
      },
      {
        "titulo": "Partes envolvidas",
        "md": "- **Tomador:** contribuinte que adere ao parcelamento.\n- **Segurado:** Fazenda credora (PGFN/RFB, estado, município).\n- **Objeto:** o débito parcelado conforme o termo de adesão."
      },
      {
        "titulo": "Quando usar",
        "md": "- Transações tributárias da PGFN com exigência de garantia.\n- Parcelamentos estaduais/municipais com exigência de garantia."
      },
      {
        "titulo": "Quando NÃO usar",
        "md": "- Débito em execução fiscal judicial → **Judicial Fiscal**.\n- Parcelamentos sem exigência de garantia (não criar exigência)."
      },
      {
        "titulo": "Documentação necessária",
        "md": "- Edital/termo do programa e termo de adesão.\n- Consolidação do débito parcelado."
      },
      {
        "titulo": "Checklist de análise",
        "md": "- [ ] O programa específico aceita seguro garantia? (verificar o edital/norma do programa — varia).\n- [ ] IS, prazo e modelo conforme a norma do programa.\n- [ ] Cronograma do parcelamento (até 120+ meses) → apólices renováveis com gestão de longo prazo."
      },
      {
        "titulo": "Legislação aplicável",
        "md": "- Lei 13.988/2020 (transação tributária federal) e editais PGFN; normas estaduais/municipais do programa.\n- Circular SUSEP 662/2022."
      },
      {
        "titulo": "Alertas críticos",
        "md": "- Inadimplência do parcelamento rompe o benefício e pode acionar a garantia — alertar o tomador.\n- Condições variam POR PROGRAMA — nunca generalizar; verificar o edital vigente."
      },
      {
        "titulo": "Critérios de subscrição",
        "md": "- Capacidade de pagamento das parcelas (a garantia cobre justamente o risco de quebra do acordo) — análise financeira rigorosa."
      },
      {
        "titulo": "FAQ",
        "md": "**P: Todo parcelamento aceita seguro garantia?**\nR: Não. Depende da norma do programa. A Traderisk verifica o edital antes de orientar."
      },
      {
        "titulo": "Argumentos comerciais",
        "md": "- Viabiliza a adesão a transações vantajosas (descontos) sem imobilizar caixa na garantia."
      },
      {
        "titulo": "Objeções",
        "md": "**\"Vou dar um imóvel em garantia.\"** → Garantia real engessa o ativo por anos e tem custo cartorial/registral. A apólice é mais ágil e não onera patrimônio."
      },
      {
        "titulo": "Conexões",
        "md": "- Quebrou o parcelamento e judicializou → **Judicial Fiscal**. Discussão administrativa → **Créditos Tributários**."
      }
    ]
  },
  "cra-cri-debentures": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição",
        "md": "Garante o pagamento (quitação) de títulos de dívida emitidos ao mercado de capitais — CRA, CRI e debêntures — reforçando a estrutura de garantias da emissão em favor dos investidores."
      },
      {
        "titulo": "Uso típico",
        "md": "- Emissões em que o estruturador exige reforço de crédito (credit enhancement).\n- Substituição de fundos de reserva ou garantias reais da emissão."
      },
      {
        "titulo": "Pontos de análise",
        "md": "- Escritura de emissão/termo de securitização: fluxos, covenants, eventos de vencimento antecipado.\n- IS = serviço da dívida coberto (parcelas, saldo) conforme desenho.\n- Agente fiduciário como interveniente; rating da operação."
      },
      {
        "titulo": "Alertas",
        "md": "- Operação de mercado de capitais — condução obrigatória pela equipe técnica; prazos de análise compatíveis com o cronograma da emissão."
      },
      {
        "titulo": "Argumento comercial",
        "md": "- Melhora as condições da emissão (taxa/demanda) ao elevar a qualidade de crédito percebida."
      },
      {
        "titulo": "Conexões",
        "md": "- **Completion Bond** (emissões de infraestrutura), **Quebra de Covenants**."
      }
    ]
  },
  "escrow-accounts": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição",
        "md": "Substitui contas-garantia (escrow) em que valores ficam bloqueados para assegurar obrigações futuras (M&A, contratos complexos), liberando o capital ao titular."
      },
      {
        "titulo": "Uso típico",
        "md": "- Escrow de M&A (retenção de preço para contingências).\n- Escrows contratuais em operações estruturadas."
      },
      {
        "titulo": "Pontos de análise",
        "md": "- Contrato de escrow: gatilhos de liberação e de retenção, prazo, agente fiduciário.\n- IS = saldo do escrow substituído.\n- Anuência do beneficiário do escrow é condição da substituição."
      },
      {
        "titulo": "Alertas",
        "md": "- Negociação tripartite (titular, beneficiário, agente) — condução pela equipe técnica."
      },
      {
        "titulo": "Argumento comercial",
        "md": "- Converte capital parado em escrow (remuneração baixa) em caixa disponível, mantendo a proteção do beneficiário."
      },
      {
        "titulo": "Conexões",
        "md": "- **M&A**, **Pagamento Futuro**."
      }
    ]
  },
  "m-and-a": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição",
        "md": "Garante obrigações do vendedor (ou comprador) em operações de fusão e aquisição: indenizações por contingências, violação de declarações e garantias (reps & warranties) e ajustes de preço previstos no SPA."
      },
      {
        "titulo": "Uso típico",
        "md": "- Substituir retenção de preço (holdback) ou escrow do SPA.\n- Garantir indenizações por contingências fiscais/trabalhistas identificadas na due diligence."
      },
      {
        "titulo": "Pontos de análise",
        "md": "- SPA: cláusulas de indenização, caps, baskets, prazos de sobrevivência das declarações.\n- Contingências mapeadas na due diligence (qualidade do relatório).\n- IS = cap de indenização ou valor retido/escrow substituído.\n- Prazo = sobrevivência das obrigações (típico: 2 a 6 anos; fiscais até 6)."
      },
      {
        "titulo": "Alertas",
        "md": "- Operação sob NDA — tratar com confidencialidade; condução pela equipe técnica.\n- Desenho caso a caso com o jurídico das partes."
      },
      {
        "titulo": "Argumento comercial",
        "md": "- Vendedor recebe 100% do preço no fechamento; comprador mantém proteção equivalente. Destrava negociações travadas em retenção de preço."
      },
      {
        "titulo": "Conexões",
        "md": "- **Escrow Accounts** (substituição), **Confissão de Dívida** (ajustes parcelados)."
      }
    ]
  },
  "confissao-de-divida": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição",
        "md": "Garante o cumprimento de acordos de confissão e parcelamento de dívida entre privados (ou em renegociações), assegurando ao credor o recebimento do fluxo acordado."
      },
      {
        "titulo": "Uso típico",
        "md": "- Renegociações comerciais com parcelamento longo.\n- Acordos extrajudiciais que evitam judicialização."
      },
      {
        "titulo": "Pontos de análise",
        "md": "- Instrumento de confissão: saldo, parcelas, vencimento antecipado, garantias coexistentes.\n- IS = saldo devedor (ou pico de exposição).\n- Histórico que originou a dívida (inadimplemento prévio eleva o risco — subscrição criteriosa)."
      },
      {
        "titulo": "Alertas",
        "md": "- O tomador já demonstrou estresse de pagamento — análise financeira rigorosa; nem todo perfil é aprovável."
      },
      {
        "titulo": "Argumento comercial",
        "md": "- Destrava acordos: o credor aceita parcelar porque o fluxo tem lastro segurado; o devedor evita execução judicial."
      },
      {
        "titulo": "Conexões",
        "md": "- **Judicial Civil** (se judicializar), **Pagamento Futuro**."
      }
    ]
  },
  "importacao-exportacao": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição",
        "md": "Garante obrigações de pagamento entre elos da cadeia de comércio exterior — importador ↔ exportador, trading ↔ fornecedor — em contratos de compra e venda internacional ou supply nacional vinculado."
      },
      {
        "titulo": "Uso típico",
        "md": "- Exportador/fornecedor exige garantia de pagamento do comprador brasileiro.\n- Tradings garantindo fluxo de pagamento a fornecedores."
      },
      {
        "titulo": "Pontos de análise",
        "md": "- Contrato de compra e venda: valores, prazos, incoterms, moeda.\n- Exposição máxima (IS) e prazo do fluxo.\n- Variação cambial quando contrato em moeda estrangeira (impacto na IS)."
      },
      {
        "titulo": "Alertas",
        "md": "- Não confundir com garantias ADUANEIRAS (tributos perante a RFB) — aqui a obrigação é comercial entre privados."
      },
      {
        "titulo": "Argumento comercial",
        "md": "- Substitui cartas de crédito e adiantamentos, reduzindo custo financeiro da cadeia."
      },
      {
        "titulo": "Conexões",
        "md": "- **Aduaneiras** (tributos), **Pagamento a Fornecedores**."
      }
    ]
  },
  "finep": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição",
        "md": "Garante obrigações do tomador em financiamentos da FINEP (inovação e pesquisa), atendendo à exigência de garantias do contrato de financiamento."
      },
      {
        "titulo": "Uso típico",
        "md": "- Empresas aprovadas em linhas FINEP que precisam constituir garantia para liberação dos recursos."
      },
      {
        "titulo": "Pontos de análise",
        "md": "- Contrato de financiamento: valor, cronograma de liberações e amortização.\n- Percentual/modelo de garantia exigido pela FINEP (seguir o normativo vigente da FINEP).\n- IS e vigência conforme o contrato de financiamento (prazos longos → renovações)."
      },
      {
        "titulo": "Alertas",
        "md": "- Requisitos formais da FINEP devem ser seguidos à risca (modelo, cláusulas).\n- Empresas de base tecnológica com balanço leve → análise olha contratos, recebíveis e sócios."
      },
      {
        "titulo": "Argumento comercial",
        "md": "- Destrava a liberação do financiamento subsidiado sem hipotecar ativos nem consumir limite bancário."
      },
      {
        "titulo": "Conexões",
        "md": "- **Pagamento Futuro**, **Execução** (se houver obrigações de projeto)."
      }
    ]
  },
  "passivos-previdenciarios": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição",
        "md": "Garante obrigações relacionadas a passivos previdenciários — débitos com o RGPS/INSS em equacionamentos, ou déficits de planos de previdência complementar (equacionamento junto a entidades fechadas), conforme a exigência aplicável."
      },
      {
        "titulo": "Uso típico",
        "md": "- Equacionamento de déficit de plano de previdência patrocinado (exigência da entidade/Previc, conforme normativo).\n- Garantia de débitos previdenciários em discussões e parcelamentos específicos."
      },
      {
        "titulo": "Pontos de análise",
        "md": "- Documento-base: termo de equacionamento, parcelamento ou exigência normativa.\n- IS, prazo e modelo conforme a norma/contrato aplicável.\n- Prazos longos → estratégia de renovação."
      },
      {
        "titulo": "Alertas",
        "md": "- Enquadramento normativo específico — validar a hipótese com a equipe técnica antes de sinalizar viabilidade."
      },
      {
        "titulo": "Argumento comercial",
        "md": "- Equaciona passivos relevantes sem imobilizar ativos da patrocinadora."
      },
      {
        "titulo": "Conexões",
        "md": "- **Judicial Fiscal** (execuções de contribuições), **Parcelamento Fiscal**."
      }
    ]
  },
  "quebra-de-covenants": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição",
        "md": "Garante a indenização ou recomposição devida ao credor em caso de violação de covenants (obrigações acessórias financeiras ou não financeiras) assumidos em contratos de crédito ou emissões."
      },
      {
        "titulo": "Uso típico",
        "md": "- Contratos de financiamento com covenants de índices (alavancagem, cobertura) cuja quebra gera multa/vencimento antecipado.\n- Estruturas em que o credor aceita flexibilizar covenants mediante garantia."
      },
      {
        "titulo": "Pontos de análise",
        "md": "- Contrato de crédito/escritura: covenants pactuados, cure periods, consequências da quebra.\n- Gatilho objetivo de sinistro (apuração do índice, declaração do agente) — essencial para a subscrição.\n- IS conforme multa/exposição negociada."
      },
      {
        "titulo": "Alertas",
        "md": "- Modalidade sofisticada e pouco padronizada — desenho caso a caso com a equipe técnica e o credor."
      },
      {
        "titulo": "Argumento comercial",
        "md": "- Compra flexibilidade financeira: o credor aceita covenants menos restritivos com a quebra lastreada em garantia."
      },
      {
        "titulo": "Conexões",
        "md": "- **CRA/CRI/Debêntures**, **Pagamento Futuro**."
      }
    ]
  },
  "arbitragem": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição",
        "md": "Garante obrigações em procedimentos arbitrais: caução para custas, garantia de cumprimento de medidas ou de eventual condenação, conforme exigido pelo tribunal arbitral ou pela câmara."
      },
      {
        "titulo": "Uso típico",
        "md": "- Caução de custas exigida de parte estrangeira ou em situação específica.\n- Garantia em tutelas de urgência arbitrais.\n- Garantia de cumprimento de sentença arbitral em negociação entre as partes."
      },
      {
        "titulo": "Pontos de análise",
        "md": "- Regulamento da câmara (CAM-CCBC, CIESP/FIESP, ICC etc.) e ordem processual que exige a garantia.\n- IS e prazo fixados pelo tribunal arbitral.\n- Confidencialidade do procedimento."
      },
      {
        "titulo": "Alertas",
        "md": "- Procedimento sigiloso — tratar com reserva; condução com equipe técnica e advogados do caso.\n- Não confundir com garantia JUDICIAL — o foro é arbitral; se houver execução judicial da sentença, migrar para **Judicial Civil**."
      },
      {
        "titulo": "Argumento comercial",
        "md": "- Evita depósito de valores relevantes em procedimentos longos e caros."
      },
      {
        "titulo": "Conexões",
        "md": "- **Judicial Civil** (execução da sentença arbitral)."
      }
    ]
  },
  "bts-sale-leaseback": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição",
        "md": "Garante as obrigações financeiras de longo prazo do ocupante em estruturas de Built-to-Suit (imóvel construído sob medida) e Sale & Leaseback (venda do imóvel com locação simultânea): aluguéis, multas de denúncia e indenizações."
      },
      {
        "titulo": "Uso típico",
        "md": "- Investidor/fundo que financia o BTS exige garantia robusta do futuro locatário por todo o prazo (10–20 anos).\n- S&LB em que o comprador exige garantia das obrigações de locação do vendedor-locatário."
      },
      {
        "titulo": "Pontos de análise",
        "md": "- Contrato BTS/S&LB: prazo, aluguel, multa de denúncia antecipada (frequentemente = aluguéis vincendos), step-up de valores.\n- IS dimensionada pela exposição máxima exigida (meses de aluguel ou multa).\n- Prazo longo → apólices renováveis com compromisso de renovação; gestão por décadas."
      },
      {
        "titulo": "Alertas",
        "md": "- A multa de denúncia em BTS pode ser o valor integral remanescente — IS potencialmente alta; escalar."
      },
      {
        "titulo": "Argumento comercial",
        "md": "- Viabiliza a estrutura: o investidor só constrói/compra com garantia sólida; o seguro entrega isso sem fiança bancária de longo prazo (cara e escassa)."
      },
      {
        "titulo": "Conexões",
        "md": "- **Imobiliárias/Fiança Locatícia** (grupo estruturadas — locação corrente), **Completion Bond** (construção)."
      }
    ]
  },
  "contratos-de-exclusividade": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição",
        "md": "Garante a indenização devida em caso de quebra de obrigação de exclusividade assumida em contrato (distribuição, fornecimento, representação)."
      },
      {
        "titulo": "Uso típico",
        "md": "- Distribuidores exclusivos garantindo a contrapartida ao fabricante (ou vice-versa).\n- Acordos comerciais com multa por quebra de exclusividade."
      },
      {
        "titulo": "Pontos de análise",
        "md": "- Cláusula de exclusividade: escopo, território, prazo, multa/indenização prevista.\n- IS = multa contratual ou indenização estimada.\n- Gatilho de sinistro precisa ser objetivo (caracterização da quebra) — cláusulas vagas dificultam a subscrição."
      },
      {
        "titulo": "Argumento comercial",
        "md": "- Dá materialidade à exclusividade: a contraparte sabe que a multa tem lastro líquido."
      },
      {
        "titulo": "Conexões",
        "md": "- **Pagamento Futuro**, **Pagamento Mínimo**."
      }
    ]
  },
  "pagamento-a-fornecedores": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição",
        "md": "Garante que o tomador pagará seus fornecedores conforme os contratos de fornecimento, protegendo a cadeia de supply."
      },
      {
        "titulo": "Uso típico",
        "md": "- Fornecedor estratégico exige garantia para conceder prazo/volume maior.\n- Programas de supply em que o comprador-âncora oferece garantia para destravar condições."
      },
      {
        "titulo": "Pontos de análise",
        "md": "- Contrato de fornecimento: volumes, prazos de pagamento, exposição rotativa.\n- IS = exposição máxima do fornecedor (ex.: 2–3 ciclos de faturamento).\n- Risco de crédito do tomador (comprador)."
      },
      {
        "titulo": "Argumento comercial",
        "md": "- Compra mais prazo e volume do fornecedor sem antecipar pagamento — capital de giro via garantia."
      },
      {
        "titulo": "Conexões",
        "md": "- **Pagamento Futuro**, **Importação/Exportação**."
      }
    ]
  },
  "pagamento-futuro": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição",
        "md": "Modalidade ampla que garante o pagamento de obrigações pecuniárias futuras assumidas em contrato (parcelas, preços, remunerações), quando não enquadradas em modalidade mais específica."
      },
      {
        "titulo": "Uso típico",
        "md": "- Contratos de compra e venda com pagamento a prazo relevante.\n- Obrigações de pagamento em contratos de longo prazo (take or pay, mínimos contratuais)."
      },
      {
        "titulo": "Pontos de análise",
        "md": "- Contrato-base: fluxo de pagamentos, vencimentos, gatilhos de inadimplemento.\n- IS = exposição máxima (saldo devedor de pico) ou conforme negociado.\n- Essência do risco é crédito puro → análise financeira rigorosa do tomador."
      },
      {
        "titulo": "Alertas",
        "md": "- Por ser \"guarda-chuva\", SEMPRE verificar se não há modalidade específica mais adequada antes de enquadrar aqui."
      },
      {
        "titulo": "Argumento comercial",
        "md": "- Permite ao credor conceder prazo sem risco e ao devedor negociar condições melhores oferecendo a garantia."
      },
      {
        "titulo": "Conexões",
        "md": "- **Pagamento a Fornecedores**, **Confissão de Dívida**, **Pagamento Mínimo**."
      }
    ]
  },
  "pagamento-minimo-franquia": {
    "intro": "",
    "sections": [
      {
        "titulo": "Definição",
        "md": "Garante ao franqueador (ou titular do balcão/ponto) o recebimento dos valores mínimos contratuais devidos pelo franqueado/operador (royalties mínimos, garantias de receita)."
      },
      {
        "titulo": "Uso típico",
        "md": "- Redes de franquia que exigem garantia dos franqueados.\n- Contratos de operação de balcão/loja com mínimo garantido."
      },
      {
        "titulo": "Pontos de análise",
        "md": "- Contrato de franquia (COF) ou de operação: mínimos, periodicidade, prazo.\n- IS = mínimos acumulados no período de exposição definido.\n- Perfil do franqueado (frequentemente PME ou PF-PJ) → análise de crédito ajustada ao porte."
      },
      {
        "titulo": "Argumento comercial",
        "md": "- Para o franqueador: substitui caução/fiador na entrada de franqueados. Para o franqueado: viabiliza a entrada na rede sem imobilizar capital."
      },
      {
        "titulo": "Conexões",
        "md": "- **Pagamento Futuro**, **Imobiliárias** (luvas/aluguel do ponto)."
      }
    ]
  }
};
