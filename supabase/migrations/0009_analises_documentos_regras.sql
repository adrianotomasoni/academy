-- Migration 0009 — Análises de documentos e regras de impedimento

CREATE TABLE analises_documentos (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id   UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    tomador_id   UUID REFERENCES tomadores(id) ON DELETE SET NULL,
    arquivo_nome TEXT NOT NULL,
    arquivo_url  TEXT,                      -- URL no Supabase Storage (bucket 'documentos')
    tipo         tipo_documento NOT NULL DEFAULT 'outro',
    status       status_analise NOT NULL DEFAULT 'processando',
    resultado    JSONB,                     -- JSON retornado pelo pipeline de análise
    estrategia   TEXT,                      -- texto da estratégia de emissão gerado pela IA
    meta         JSONB,                     -- {paginas, ocr_usado, chunks}
    criado_em    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_analises_doc_usuario ON analises_documentos(usuario_id);
CREATE INDEX idx_analises_doc_status  ON analises_documentos(status);

CREATE TRIGGER trg_analises_doc_atualizado_em
    BEFORE UPDATE ON analises_documentos
    FOR EACH ROW EXECUTE FUNCTION set_atualizado_em();

-- Regras de impedimento editáveis sem deploy.
-- Bloqueadores (B) impedem a operação; Alertas (A) exigem tratamento estruturado.
CREATE TABLE regras_impedimento (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo      TEXT NOT NULL UNIQUE,       -- ex: 'B1', 'A3'
    nivel       nivel_impedimento NOT NULL,
    descricao   TEXT NOT NULL,              -- título curto da regra
    detalhe     TEXT,                       -- explicação completa para o relatório
    ativa       BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_regras_atualizado_em
    BEFORE UPDATE ON regras_impedimento
    FOR EACH ROW EXECUTE FUNCTION set_atualizado_em();
