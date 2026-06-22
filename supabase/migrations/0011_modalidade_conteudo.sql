-- Migration 0011 — Conteúdo didático por modalidade (vídeos, cases de sinistro, arquivos)
-- Editável pela equipe Traderisk sem deploy. As páginas públicas de cada modalidade
-- leem destas tabelas; o texto técnico vem da base de conhecimento (.md).

-- ─────────────────────────────────────────────
-- Tabelas
-- ─────────────────────────────────────────────

-- Vídeo-aula(s) da modalidade — públicas (educacional aberto)
CREATE TABLE IF NOT EXISTS modalidade_videos (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug        TEXT NOT NULL,                 -- slug da modalidade (lib/modalidades.ts)
    titulo      TEXT NOT NULL,
    descricao   TEXT,
    url         TEXT NOT NULL,                 -- URL de embed (YouTube/Vimeo) ou arquivo
    duracao     TEXT,                          -- ex.: "6 min"
    ordem       INT NOT NULL DEFAULT 0,
    criado_em   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_mod_videos_slug ON modalidade_videos (slug, ordem);

-- Arquivos adicionais (modelos, condições gerais, checklists) — públicos
CREATE TABLE IF NOT EXISTS modalidade_arquivos (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug        TEXT NOT NULL,
    titulo      TEXT NOT NULL,
    descricao   TEXT,
    arquivo_url TEXT NOT NULL,                 -- URL pública no Storage (bucket 'modalidades')
    tipo        TEXT NOT NULL DEFAULT 'pdf',   -- pdf | docx | xlsx | link
    tamanho     TEXT,                          -- ex.: "320 KB"
    ordem       INT NOT NULL DEFAULT 0,
    criado_em   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_mod_arquivos_slug ON modalidade_arquivos (slug, ordem);

-- Cases de sinistro — exclusivos de assinantes (somente autenticados)
CREATE TABLE IF NOT EXISTS modalidade_cases (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug        TEXT NOT NULL,
    titulo      TEXT NOT NULL,
    resumo      TEXT,
    conteudo    TEXT,                          -- markdown do case
    desfecho    TEXT,                          -- aprendizado/lição
    ordem       INT NOT NULL DEFAULT 0,
    criado_em   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_mod_cases_slug ON modalidade_cases (slug, ordem);

-- ─────────────────────────────────────────────
-- Storage: bucket público para arquivos das modalidades
-- ─────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('modalidades', 'modalidades', TRUE)
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────
-- RLS
-- ─────────────────────────────────────────────
ALTER TABLE modalidade_videos   ENABLE ROW LEVEL SECURITY;
ALTER TABLE modalidade_arquivos ENABLE ROW LEVEL SECURITY;
ALTER TABLE modalidade_cases    ENABLE ROW LEVEL SECURITY;

-- Vídeos e arquivos: conteúdo educacional aberto (anon + autenticados)
CREATE POLICY "modalidade_videos: leitura pública"
    ON modalidade_videos FOR SELECT USING (TRUE);
CREATE POLICY "modalidade_arquivos: leitura pública"
    ON modalidade_arquivos FOR SELECT USING (TRUE);

-- Cases de sinistro: apenas usuários autenticados (assinantes)
CREATE POLICY "modalidade_cases: leitura autenticada"
    ON modalidade_cases FOR SELECT USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- Seed de exemplo (placeholders) — substituir por conteúdo real da Traderisk
-- ─────────────────────────────────────────────
INSERT INTO modalidade_videos (slug, titulo, descricao, url, duracao, ordem) VALUES
  ('licitacao-bid', 'O que é a Garantia de Licitação (Bid Bond)',
   'Aula introdutória: para que serve e quando exigir.',
   'https://www.youtube.com/embed/ysz5S6PUM-U', '5 min', 0)
ON CONFLICT DO NOTHING;

INSERT INTO modalidade_arquivos (slug, titulo, descricao, arquivo_url, tipo, tamanho, ordem) VALUES
  ('licitacao-bid', 'Checklist de análise — Bid Bond',
   'Itens essenciais antes de emitir a garantia de proposta.',
   'https://academy.traderisk.com.br/storage/exemplo-checklist.pdf', 'pdf', '120 KB', 0)
ON CONFLICT DO NOTHING;

INSERT INTO modalidade_cases (slug, titulo, resumo, conteudo, desfecho, ordem) VALUES
  ('licitacao-bid', 'Vencedor desistiu de assinar o contrato',
   'A empresa venceu, recuou na assinatura e o órgão acionou a garantia de proposta.',
   'O edital exigia bid bond de 1%. Declarada vencedora, a empresa identificou erro de precificação e desistiu de assinar. O órgão acionou a apólice.',
   'A apólice cobriu o prejuízo do certame. Aprendizado: validar a viabilidade da proposta ANTES de disputar, pois a garantia de proposta é acionável.',
   0)
ON CONFLICT DO NOTHING;
