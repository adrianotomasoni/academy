-- Migration 0004 — Processos judiciais, contratos públicos e restritivos

CREATE TABLE processos_judiciais (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tomador_id          UUID NOT NULL REFERENCES tomadores(id) ON DELETE CASCADE,
    numero_cnj          TEXT NOT NULL,
    tribunal            TEXT,
    fase                TEXT,
    polo                polo_processo NOT NULL DEFAULT 'nao_identificado',
    valor_causa         NUMERIC(15,2),
    modalidade_provavel TEXT,
    fonte               TEXT,           -- 'datajud' | 'escavador'
    dados_completos     JSONB,
    consultado_em       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    criado_em           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (tomador_id, numero_cnj)
);

CREATE INDEX idx_processos_tomador ON processos_judiciais(tomador_id);
CREATE INDEX idx_processos_polo    ON processos_judiciais(polo);

CREATE TABLE contratos_publicos (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tomador_id      UUID NOT NULL REFERENCES tomadores(id) ON DELETE CASCADE,
    numero_pncp     TEXT,
    orgao           TEXT,
    valor           NUMERIC(15,2),
    objeto          TEXT,
    status          TEXT,
    data_assinatura DATE,
    dados_completos JSONB,
    consultado_em   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    criado_em       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contratos_tomador ON contratos_publicos(tomador_id);

CREATE TABLE restritivos (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tomador_id  UUID NOT NULL REFERENCES tomadores(id) ON DELETE CASCADE,
    tipo        TEXT NOT NULL,                           -- ex: 'sisbajud', 'cadin', 'ceis'
    descricao   TEXT,
    fonte       TEXT,
    nivel       nivel_impedimento NOT NULL DEFAULT 'alerta',
    criado_em   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_restritivos_tomador ON restritivos(tomador_id);
