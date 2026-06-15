# Integração APIBrasil — Consulta CNPJ

**Status: estruturação futura. Documento de arquitetura, sem implementação.**

## O que é
API da plataforma APIBrasil para consulta de dados cadastrais de CNPJ (base Receita Federal), usada para pré-qualificação automática de tomadores.

## Dados relevantes para o agente
- Razão social, nome fantasia, situação cadastral (ATIVA/BAIXADA/SUSPENSA/INAPTA).
- Data de abertura → tempo de atividade (critério de subscrição).
- CNAE principal e secundários → aderência da atividade ao objeto garantido (ex.: construtora para performance bond).
- Porte e capital social → dimensionamento preliminar frente à IS pretendida.
- QSA (quadro societário) → identificação de sócios para CCG/avais.
- Endereço e contatos → dossiê cadastral.

## Endpoint (referência)
- Plataforma: `https://gateway.apibrasil.io/api/v2/` (módulo CNPJ/dados)
- Autenticação: Bearer token + device token (credenciais da conta APIBrasil)
- Método: POST com `{ "cnpj": "00000000000000" }`

## Mapeamento CNPJ → conhecimento do agente
| Dado | Camada do cérebro | Uso |
|---|---|---|
| Situação cadastral | 01/subscricao | Inapta/baixada → bloqueio imediato |
| CNAE | 01/analise-de-contratos | Compatibilidade técnica com o objeto |
| Capital/porte | 01/subscricao | Alerta de IS desproporcional ao porte |
| QSA | 01/partes-da-apolice (CCG) | Sócios prováveis avalistas |

## O que a API NÃO entrega (manter expectativa correta)
- Balanços, restritivos (Serasa/protestos), execuções fiscais e RJ → continuam dependendo de documentação e bureaus próprios. A consulta CNPJ é o PRIMEIRO filtro, não a análise.

## Estrutura futura sugerida do repositório
```
apibrasil-cnpj/
├── README.md            (este documento)
├── docs/
│   └── campos-e-validacoes.md   (dicionário de campos + regras de pré-qualificação)
├── src/                 (cliente da API — futuro)
└── tests/               (futuro)
```
