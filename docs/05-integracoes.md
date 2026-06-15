# 05 — Integrações Externas

Guia de configuração de cada API externa. Todas têm modo mock — sem credenciais, retornam dados de exemplo para desenvolvimento.

## APIBrasil — Consulta CNPJ

1. Crie conta em [apibrasil.com.br](https://apibrasil.com.br).
2. Assine o plano que inclui o módulo **Dados CNPJ**.
3. Pegue o **Bearer Token** e o **Device Token** no painel.
4. No `.env` do backend:
   ```
   APIBRASIL_TOKEN=seu_bearer_token
   APIBRASIL_DEVICE_TOKEN=seu_device_token
   ```
5. Implementação: `apps/api/app/services/integracoes/apibrasil.py`.
6. **Cache obrigatório**: salve o resultado em `tomadores.dados_rfb_raw` com `dados_rfb_em`. Reutilize por 30 dias para não pagar consultas repetidas.

## DataJud — Processos Judiciais (CNJ)

1. A API pública do CNJ exige chave pública (gratuita). Solicite em [datajud-wiki.cnj.jus.br](https://datajud-wiki.cnj.jus.br).
2. No `.env`:
   ```
   DATAJUD_API_KEY=sua_chave_publica
   ```
3. Endpoint: `https://api-publica.datajud.cnj.jus.br/api_publica_{tribunal}/_search`.
4. Limitação importante: o DataJud busca por **número de processo**, não por CNPJ da parte. Para buscar por CNPJ:
   - Opção A: usar o Escavador (busca por parte/documento).
   - Opção B: manter índice próprio de processos já mapeados.
5. Princípio de custo: consultas em batch a cada 15 dias para monitoramento; on-demand na qualificação de demanda nova.

## Escavador — Monitoramento Processual

1. Crie conta em [escavador.com](https://escavador.com) e assine a API.
2. Pegue o token no painel.
3. No `.env`:
   ```
   ESCAVADOR_TOKEN=seu_token
   ```
4. Uso: busca por CNPJ/CPF da parte e monitoramento de movimentações (alertas do pipeline judicial — Módulo 6).
5. Princípio de custo: acionar apenas quando há nova movimentação relevante. Empresas em recuperação judicial devem ser excluídas da pontuação de oportunidade.

## Portal Nacional de Compras Públicas (PNCP)

1. API pública e gratuita: [pncp.gov.br/api/pncp](https://pncp.gov.br/api/pncp).
2. Não exige autenticação para consultas básicas.
3. Endpoint de contratos por fornecedor: consultar a documentação oficial da versão vigente.
4. Implementação: `apps/api/app/services/integracoes/pncp.py`.

## Claude API (Anthropic)

1. Crie conta em [console.anthropic.com](https://console.anthropic.com).
2. Gere uma API key.
3. No `.env`:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   CLAUDE_MODEL=claude-sonnet-4-6
   ```
4. Usado em: chat RAG (Módulo 3) e análise de contratos (Módulo 7).

## OpenAI (Embeddings)

1. Crie conta em [platform.openai.com](https://platform.openai.com).
2. Gere uma API key.
3. No `.env`:
   ```
   OPENAI_API_KEY=sk-...
   EMBEDDING_MODEL=text-embedding-3-small
   ```
4. Usado em: geração de embeddings para o RAG (ingestão + busca).

## AWS Textract (OCR) — opcional

Necessário apenas para PDFs escaneados (imagem de texto).

1. Crie uma conta AWS e um usuário IAM com permissão `AmazonTextractFullAccess`.
2. No `.env`:
   ```
   AWS_ACCESS_KEY_ID=...
   AWS_SECRET_ACCESS_KEY=...
   AWS_REGION=sa-east-1
   ```
3. Implementação pendente em `extrator_texto.py::_ocr_pagina`. Alternativa: Google Document AI.

## Stripe — Pagamentos

1. Crie conta em [stripe.com](https://stripe.com).
2. Pegue a **Secret key** (test mode para dev).
3. Crie os produtos/preços: Pro Corretor (mensal/anual), Pro Tomador.
4. Configure o webhook apontando para `/stripe/webhook` e pegue o **Webhook secret**.
5. No `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## Tabela-resumo de variáveis

| Variável | Serviço | Obrigatória para |
|---|---|---|
| ANTHROPIC_API_KEY | Claude | Chat + análise de contratos |
| OPENAI_API_KEY | OpenAI | RAG (embeddings) |
| SUPABASE_* | Supabase | Tudo |
| APIBRASIL_* | APIBrasil | Dossiê CNPJ |
| DATAJUD_API_KEY | CNJ | Processos judiciais |
| ESCAVADOR_TOKEN | Escavador | Monitoramento / pipeline |
| STRIPE_* | Stripe | Planos pagos |
| AWS_* | AWS | OCR de PDF escaneado |
