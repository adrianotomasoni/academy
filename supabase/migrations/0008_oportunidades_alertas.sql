-- Migration 0008 — Oportunidades judiciais e alertas processuais

CREATE TABLE oportunidades_judiciais (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id        UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    tomador_id        UUID NOT NULL REFERENCES tomadores(id) ON DELETE CASCADE,
    processo_id       UUID REFERENCES processos_judiciais(id) ON DELETE SET NULL,
    numero_cnj        TEXT NOT NULL,
    tribunal          TEXT,
    valor_deposito    NUMERIC(15,2),
    modalidade_sugerida TEXT,
    status            status_oportunidade NOT NULL DEFAULT 'nova',
    notas             TEXT,
    escavador_id      INTEGER,           -- ID interno do Escavador para monitoramento
    criado_em         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (usuario_id, numero_cnj)
);

CREATE INDEX idx_oportunidades_usuario   ON oportunidades_judiciais(usuario_id);
CREATE INDEX idx_oportunidades_tomador   ON oportunidades_judiciais(tomador_id);
CREATE INDEX idx_oportunidades_status    ON oportunidades_judiciais(status);

CREATE TRIGGER trg_oportunidades_atualizado_em
    BEFORE UPDATE ON oportunidades_judiciais
    FOR EACH ROW EXECUTE FUNCTION set_atualizado_em();

CREATE TABLE alertas_processuais (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    oportunidade_id  UUID NOT NULL REFERENCES oportunidades_judiciais(id) ON DELETE CASCADE,
    usuario_id       UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo             TEXT NOT NULL,      -- 'nova_movimentacao' | 'prazo_vencendo' | 'sentenca'
    descricao        TEXT,
    lido             BOOLEAN NOT NULL DEFAULT FALSE,
    criado_em        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_alertas_oportunidade ON alertas_processuais(oportunidade_id);
CREATE INDEX idx_alertas_usuario_lido ON alertas_processuais(usuario_id, lido);
