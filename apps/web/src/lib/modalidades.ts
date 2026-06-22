export type Grupo = "tradicionais" | "judiciais" | "estruturadas" | "financeiras";

/** Chave de acento (cor/ícone) resolvida na UI — ver components/ui/grupo.tsx */
export type GrupoAccent = "tradicional" | "judicial" | "estruturada" | "financeira";

export const GRUPOS: Record<
  Grupo,
  { label: string; desc: string; accent: GrupoAccent }
> = {
  tradicionais: {
    label: "Tradicionais",
    desc: "Licitações e contratos de obras, fornecimento e serviços.",
    accent: "tradicional",
  },
  judiciais: {
    label: "Judiciais",
    desc: "Substituição de depósitos e garantias em processos.",
    accent: "judicial",
  },
  estruturadas: {
    label: "Estruturadas",
    desc: "Operações complexas e setoriais sob medida.",
    accent: "estruturada",
  },
  financeiras: {
    label: "Financeiras",
    desc: "Garantias ligadas a estruturas de capital e crédito.",
    accent: "financeira",
  },
};

export const ORDEM_GRUPOS: Grupo[] = ["tradicionais", "judiciais", "estruturadas", "financeiras"];

export type Modalidade = {
  slug: string;
  nome: string;
  grupo: Grupo;
  resumo: string;
};

export const MODALIDADES: Modalidade[] = [
  // Tradicionais
  { slug: "licitacao-bid", nome: "Licitação (Bid Bond)", grupo: "tradicionais", resumo: "Garante a manutenção da proposta do licitante durante a fase de habilitação." },
  { slug: "execucao-contrato", nome: "Execução de contrato", grupo: "tradicionais", resumo: "Assegura o cumprimento de um contrato de obra, fornecimento ou serviço." },
  { slug: "adiantamento-de-pagamento", nome: "Adiantamento de pagamento", grupo: "tradicionais", resumo: "Protege o contratante contra a má aplicação de valores adiantados ao fornecedor." },
  { slug: "manutencao-corretiva", nome: "Manutenção corretiva", grupo: "tradicionais", resumo: "Cobre defeitos e vícios surgidos após a entrega da obra ou serviço." },
  { slug: "retencao-de-pagamento", nome: "Retenção de pagamento", grupo: "tradicionais", resumo: "Substitui a retenção contratual de valores por uma apólice de garantia." },

  // Judiciais
  { slug: "deposito-recursal-trabalhista", nome: "Depósito recursal trabalhista", grupo: "judiciais", resumo: "Substitui o depósito recursal em dinheiro para recorrer na Justiça do Trabalho." },
  { slug: "judicial-trabalhista", nome: "Garantia judicial trabalhista", grupo: "judiciais", resumo: "Garante a execução em ações trabalhistas, liberando capital de giro do tomador." },
  { slug: "judicial-civil", nome: "Garantia judicial cível", grupo: "judiciais", resumo: "Caução em ações cíveis, substituindo penhora ou depósito por apólice." },
  { slug: "judicial-fiscal", nome: "Garantia judicial fiscal", grupo: "judiciais", resumo: "Garante execuções fiscais, suspendendo a exigibilidade e liberando certidões." },

  // Estruturadas
  { slug: "concessoes-publicas", nome: "Concessões públicas", grupo: "estruturadas", resumo: "Garantia de performance em contratos de concessão e PPP." },
  { slug: "completion-bond", nome: "Completion bond", grupo: "estruturadas", resumo: "Garante a conclusão de grandes projetos de infraestrutura e construção." },
  { slug: "energia", nome: "Energia", grupo: "estruturadas", resumo: "Garantias para geração, transmissão e comercialização no setor elétrico." },
  { slug: "creditos-tributarios", nome: "Créditos tributários", grupo: "estruturadas", resumo: "Garante operações lastreadas em créditos tributários reconhecidos." },
  { slug: "aduaneiras", nome: "Aduaneiras", grupo: "estruturadas", resumo: "Garantias exigidas em regimes aduaneiros especiais e trânsito de mercadorias." },
  { slug: "imobiliarias-fianca-locaticia", nome: "Fiança locatícia", grupo: "estruturadas", resumo: "Substitui o fiador em locações comerciais e residenciais." },
  { slug: "parcelamento-fiscal", nome: "Parcelamento fiscal", grupo: "estruturadas", resumo: "Garante parcelamentos de débitos tributários federais, estaduais e municipais." },

  // Financeiras
  { slug: "cra-cri-debentures", nome: "CRA / CRI / debêntures", grupo: "financeiras", resumo: "Garantia em operações estruturadas do mercado de capitais." },
  { slug: "escrow-accounts", nome: "Escrow accounts", grupo: "financeiras", resumo: "Estrutura de conta-garantia para liquidação condicionada de obrigações." },
  { slug: "m-and-a", nome: "M&A", grupo: "financeiras", resumo: "Garante obrigações de indenização em operações de fusão e aquisição." },
  { slug: "confissao-de-divida", nome: "Confissão de dívida", grupo: "financeiras", resumo: "Garante o pagamento de dívidas reconhecidas e renegociadas." },
  { slug: "importacao-exportacao", nome: "Importação / exportação", grupo: "financeiras", resumo: "Garantias no comércio exterior e em cadeias de suprimento internacionais." },
  { slug: "finep", nome: "FINEP", grupo: "financeiras", resumo: "Garante operações de financiamento à inovação junto à FINEP." },
  { slug: "passivos-previdenciarios", nome: "Passivos previdenciários", grupo: "financeiras", resumo: "Garante parcelamentos e discussões de passivos previdenciários." },
  { slug: "quebra-de-covenants", nome: "Quebra de covenants", grupo: "financeiras", resumo: "Garantia acionada em descumprimento de cláusulas financeiras de contratos de crédito." },
  { slug: "arbitragem", nome: "Arbitragem", grupo: "financeiras", resumo: "Garante valores discutidos em procedimentos arbitrais, sem imobilizar caixa." },
  { slug: "bts-sale-leaseback", nome: "BTS / Sale & Leaseback", grupo: "financeiras", resumo: "Garante os pagamentos de longo prazo em built-to-suit e sale & leaseback." },
  { slug: "contratos-de-exclusividade", nome: "Contratos de exclusividade", grupo: "financeiras", resumo: "Garante compromissos financeiros assumidos em acordos de exclusividade." },
  { slug: "pagamento-a-fornecedores", nome: "Pagamento a fornecedores", grupo: "financeiras", resumo: "Dá segurança aos fornecedores de que serão pagos pelo que forneceram." },
  { slug: "pagamento-futuro", nome: "Pagamento futuro", grupo: "financeiras", resumo: "Garante o cumprimento de obrigações pecuniárias combinadas para o futuro." },
  { slug: "pagamento-minimo-franquia", nome: "Pagamento mínimo (franquia)", grupo: "financeiras", resumo: "Garante o valor mínimo acordado em contratos de franquia ou de balcão." },
];

export function getModalidade(slug: string): Modalidade | undefined {
  return MODALIDADES.find((m) => m.slug === slug);
}

export function modalidadesPorGrupo(): Record<Grupo, Modalidade[]> {
  const out = { tradicionais: [], judiciais: [], estruturadas: [], financeiras: [] } as Record<Grupo, Modalidade[]>;
  for (const m of MODALIDADES) out[m.grupo].push(m);
  return out;
}
