#!/usr/bin/env node
/**
 * Gera src/content/modalidades-conteudo.generated.ts a partir da base de
 * conhecimento (packages/knowledge-base). A saída é versionada para que o
 * build não dependa de ler arquivos fora do diretório do app (deploy-safe).
 *
 * Uso: npm run gen:modalidades
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KB = resolve(
  __dirname,
  "../../../packages/knowledge-base/agente-seguro-garantia/02_GRUPOS_DE_MODALIDADES",
);

// slug -> caminho relativo (sub/arquivo) dentro de 02_GRUPOS_DE_MODALIDADES
const MAP = {
  "licitacao-bid": "tradicionais/licitacao-bid",
  "execucao-contrato": "tradicionais/execucao-construcao-fornecimento-servicos",
  "adiantamento-de-pagamento": "tradicionais/adiantamento-de-pagamento",
  "manutencao-corretiva": "tradicionais/manutencao-corretiva",
  "retencao-de-pagamento": "tradicionais/retencao-de-pagamento",
  "deposito-recursal-trabalhista": "judiciais/deposito-recursal-trabalhista",
  "judicial-trabalhista": "judiciais/judicial-trabalhista",
  "judicial-civil": "judiciais/judicial-civil",
  "judicial-fiscal": "judiciais/judicial-fiscal",
  "concessoes-publicas": "estruturadas/concessoes-publicas",
  "completion-bond": "estruturadas/completion-bond",
  energia: "estruturadas/energia",
  "creditos-tributarios": "estruturadas/creditos-tributarios",
  aduaneiras: "estruturadas/aduaneiras",
  "imobiliarias-fianca-locaticia": "estruturadas/imobiliarias-fianca-locaticia",
  "parcelamento-fiscal": "estruturadas/parcelamento-fiscal",
  "cra-cri-debentures": "financeiras/cra-cri-debentures",
  "escrow-accounts": "financeiras/escrow-accounts",
  "m-and-a": "financeiras/m-and-a",
  "confissao-de-divida": "financeiras/confissao-de-divida",
  "importacao-exportacao": "financeiras/importacao-exportacao",
  finep: "financeiras/finep",
  "passivos-previdenciarios": "financeiras/passivos-previdenciarios",
  "quebra-de-covenants": "financeiras/quebra-de-covenants",
  arbitragem: "financeiras/arbitragem",
  "bts-sale-leaseback": "financeiras/bts-sale-leaseback",
  "contratos-de-exclusividade": "financeiras/contratos-de-exclusividade",
  "pagamento-a-fornecedores": "financeiras/pagamento-a-fornecedores",
  "pagamento-futuro": "financeiras/pagamento-futuro",
  "pagamento-minimo-franquia": "financeiras/pagamento-minimo-franquia",
};

/** Divide um markdown em intro + seções por "## ". Remove o "## N." numérico do título. */
function parse(md) {
  const lines = md.split("\n");
  let i = 0;
  // pula o título "# ..."
  if (lines[0]?.startsWith("# ")) i = 1;
  const intro = [];
  while (i < lines.length && !lines[i].startsWith("## ")) {
    intro.push(lines[i]);
    i++;
  }
  const sections = [];
  let cur = null;
  for (; i < lines.length; i++) {
    const l = lines[i];
    if (l.startsWith("## ")) {
      if (cur) sections.push(cur);
      const titulo = l
        .replace(/^##\s+/, "")
        .replace(/^\d+\.\s*/, "")
        .trim();
      cur = { titulo, body: [] };
    } else if (cur) {
      cur.body.push(l);
    }
  }
  if (cur) sections.push(cur);
  return {
    intro: intro.join("\n").trim(),
    sections: sections.map((s) => ({ titulo: s.titulo, md: s.body.join("\n").trim() })),
  };
}

const out = {};
for (const [slug, rel] of Object.entries(MAP)) {
  const file = `${KB}/${rel}.md`;
  const raw = readFileSync(file, "utf8");
  out[slug] = parse(raw);
}

const header = `// ARQUIVO GERADO — não edite à mão.
// Fonte: packages/knowledge-base/agente-seguro-garantia/02_GRUPOS_DE_MODALIDADES
// Regenerar: npm run gen:modalidades

export type SecaoConteudo = { titulo: string; md: string };
export type ModalidadeConteudo = { intro: string; sections: SecaoConteudo[] };

export const MODALIDADES_CONTEUDO: Record<string, ModalidadeConteudo> = `;

const dst = resolve(__dirname, "../src/content/modalidades-conteudo.generated.ts");
mkdirSync(dirname(dst), { recursive: true });
writeFileSync(dst, header + JSON.stringify(out, null, 2) + ";\n", "utf8");
console.log(`Gerado ${dst} com ${Object.keys(out).length} modalidades.`);
