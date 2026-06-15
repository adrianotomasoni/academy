# 07 — Melhores Práticas

Padrões do projeto para manter qualidade e segurança ao longo do desenvolvimento.

## Segurança

### Chaves e segredos
- NUNCA commitar `.env`. O `.gitignore` já protege — confirme antes de cada push.
- A `service_role` key do Supabase só existe no backend. Jamais no frontend ou em código versionado.
- Use os Secrets do GitHub e as variáveis de ambiente dos serviços de deploy.
- Rotacione chaves periodicamente.

### Row Level Security (RLS)
- Todas as tabelas com dados de usuário têm RLS habilitado.
- O frontend usa a `anon` key — só acessa o que a RLS permite.
- O backend usa a `service_role` para operações administrativas — com responsabilidade.

### Dados sensíveis
- Balanços e contratos no Storage privado, com acesso por RLS.
- Restritivos (Serasa) têm custo e são sensíveis: cache de 30 dias e acesso só no plano Pro.
- LGPD: o tomador consente com a análise dos próprios dados. Documente o consentimento.

## Arquitetura

### Separação de responsabilidades
- `routers/` — apenas recebe requisição, valida, chama serviço, retorna. Sem lógica de negócio.
- `services/` — lógica de negócio. Orquestra integrações e IA.
- `core/` — infraestrutura (config, clientes, auth).
- `prompts/` — prompts da IA isolados, versionáveis e testáveis.

### O conhecimento é separado do código
- A base de conhecimento (`packages/knowledge-base`) é independente do código.
- As regras de impedimento estão na tabela `regras_impedimento` — a equipe Traderisk edita sem deploy.
- Princípio: dados de API alimentam o agente; o conhecimento decide o que fazer com eles.

## IA e prompts

### Sempre exigir JSON puro
- Prompts de extração pedem JSON sem markdown. O parser remove cercas por segurança.
- Valide o JSON retornado antes de salvar. Trate erros de parsing.

### Custo de IA
- Chat: limite de 10 perguntas/mês no free força o upgrade e controla custo.
- Análise de contratos: chunking evita enviar documentos gigantes de uma vez.
- Embeddings: gerados uma vez na ingestão, não a cada busca (só a pergunta é embedada em runtime).

### Nunca confiar cegamente na IA
- A IA sinaliza; a equipe técnica e a seguradora decidem.
- O relatório sempre deixa claro que depende de análise da seguradora.
- Regras de impedimento críticas (vigência > 60 meses, trabalhista fase adm.) são checadas por regra fixa, não só por IA.

## Regras de negócio invioláveis (do domínio)

Estas regras estão na base de conhecimento e devem ser respeitadas no código e nos prompts:

- Mapfre é inativa em Seguro Garantia — nunca aparece em cotações.
- Cosseguro só acima de R$ 200M de IS.
- Seguro de Crédito está fora de escopo.
- Nunca mencionar comissões para tomadores.
- Garantia judicial: só polo passivo.
- Renovação de apólice judicial é fundamentada em norma, não em conveniência comercial.

## Código

### Python (backend)
- Formatação: Black (configurado para format on save).
- Type hints sempre que possível.
- Funções pequenas e nomeadas em português quando refletem o domínio (`montar_dossie`, `analisar_documento`).

### TypeScript (frontend)
- Formatação: Prettier.
- Componentes funcionais com tipos explícitos.
- `lib/api.ts` centraliza as chamadas ao backend.

### Commits
- Conventional Commits (ver `docs/03-github-setup.md`).
- PRs pequenos e focados. Um PR = uma funcionalidade ou correção.

## Testes

- Backend: pytest em `apps/api/tests`. Comece pelos serviços críticos (análise, dossiê).
- Mocke as APIs externas nos testes — não gaste créditos reais.
- Frontend: priorize testes de integração dos fluxos principais (CNPJ, chat, upload).

## Performance

- Cache de consultas externas (CNPJ, processos) no banco.
- Embeddings pré-computados.
- Frontend: SSG para páginas educacionais (SEO + velocidade); SSR só onde precisa de dados dinâmicos.
- Análise de contrato é assíncrona: mostre progresso, não bloqueie a UI.

## Manutenção da base de conhecimento

- Revisar legislação trimestralmente (portarias PGFN, atos TST, teto do depósito recursal).
- Atualizar linhas de corte das seguradoras conforme mudança de apetite.
- Após editar a KB, reingestar os embeddings (ver `docs/04`).
- Versionar a KB junto com o código — toda mudança passa por PR.
