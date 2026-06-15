-- Migration 0002 — Usuários e Assinaturas

CREATE TABLE usuarios (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id       UUID UNIQUE NOT NULL,          -- auth.users.id (Supabase Auth)
    email         TEXT NOT NULL UNIQUE,
    nome          TEXT NOT NULL,
    perfil        perfil_usuario NOT NULL DEFAULT 'corretor',
    plano         plano_usuario  NOT NULL DEFAULT 'free',
    criado_em     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_usuarios_atualizado_em
    BEFORE UPDATE ON usuarios
    FOR EACH ROW EXECUTE FUNCTION set_atualizado_em();

CREATE TABLE assinaturas (
    id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id             UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    plano                  plano_usuario     NOT NULL,
    status                 status_assinatura NOT NULL DEFAULT 'trial',
    stripe_subscription_id TEXT,
    stripe_customer_id     TEXT,
    inicio                 TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    fim                    TIMESTAMPTZ,
    criado_em              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_assinaturas_usuario ON assinaturas(usuario_id);

CREATE TRIGGER trg_assinaturas_atualizado_em
    BEFORE UPDATE ON assinaturas
    FOR EACH ROW EXECUTE FUNCTION set_atualizado_em();

-- Contador de uso mensal (chat e análise)
CREATE TABLE uso_mensal (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id  UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    mes         TEXT NOT NULL,       -- formato YYYY-MM
    chat_count  INTEGER NOT NULL DEFAULT 0,
    analise_count INTEGER NOT NULL DEFAULT 0,
    UNIQUE (usuario_id, mes)
);
