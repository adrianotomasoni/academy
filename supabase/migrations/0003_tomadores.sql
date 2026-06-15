-- Migration 0003 — Tomadores e vínculo com usuários

CREATE TABLE tomadores (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cnpj            TEXT NOT NULL UNIQUE,
    razao_social    TEXT NOT NULL,
    situacao        TEXT,
    cnae_principal  TEXT,
    porte           TEXT,
    capital_social  NUMERIC(15,2),
    dados_cadastrais JSONB,                      -- resposta completa da APIBrasil
    cache_expira_em  TIMESTAMPTZ,                -- renovar após 30 dias
    criado_em        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tomadores_cnpj ON tomadores(cnpj);

CREATE TRIGGER trg_tomadores_atualizado_em
    BEFORE UPDATE ON tomadores
    FOR EACH ROW EXECUTE FUNCTION set_atualizado_em();

-- Relacionamento N:N entre usuários e tomadores que acompanham
CREATE TABLE usuario_tomador (
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    tomador_id UUID NOT NULL REFERENCES tomadores(id) ON DELETE CASCADE,
    criado_em  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (usuario_id, tomador_id)
);
