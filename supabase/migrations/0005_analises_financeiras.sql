-- Migration 0005 — Análises financeiras do tomador

CREATE TABLE analises_financeiras (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tomador_id       UUID NOT NULL REFERENCES tomadores(id) ON DELETE CASCADE,
    usuario_id       UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    dados_financeiros JSONB,            -- balanço, DRE, indicadores
    score_risco      SMALLINT           -- 0-100 (menor = mais arriscado)
        CHECK (score_risco BETWEEN 0 AND 100),
    parecer          TEXT,
    criado_em        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_analises_fin_tomador  ON analises_financeiras(tomador_id);
CREATE INDEX idx_analises_fin_usuario  ON analises_financeiras(usuario_id);

CREATE TRIGGER trg_analises_fin_atualizado_em
    BEFORE UPDATE ON analises_financeiras
    FOR EACH ROW EXECUTE FUNCTION set_atualizado_em();
