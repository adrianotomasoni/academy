-- Migration 0006 — Seguradoras, modalidades, linhas de corte e função de filtragem

CREATE TABLE seguradoras (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome          TEXT NOT NULL UNIQUE,
    ativa         BOOLEAN NOT NULL DEFAULT TRUE,
    rating        TEXT,                          -- ex: 'A+', 'AA-'
    criado_em     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_seguradoras_atualizado_em
    BEFORE UPDATE ON seguradoras
    FOR EACH ROW EXECUTE FUNCTION set_atualizado_em();

CREATE TABLE modalidades (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seguradora_id UUID NOT NULL REFERENCES seguradoras(id) ON DELETE CASCADE,
    grupo         grupo_modalidade NOT NULL,
    nome          TEXT NOT NULL,
    ativa         BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_modalidades_seguradora ON modalidades(seguradora_id);
CREATE INDEX idx_modalidades_grupo      ON modalidades(grupo);

CREATE TABLE linhas_de_corte (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seguradora_id       UUID NOT NULL REFERENCES seguradoras(id) ON DELETE CASCADE,
    modalidade          TEXT NOT NULL,
    is_minimo           NUMERIC(15,2) NOT NULL DEFAULT 0,
    is_maximo           NUMERIC(15,2),           -- NULL = sem limite superior
    prazo_maximo_meses  INTEGER,                 -- NULL = sem limite de prazo
    requer_cosseguro    BOOLEAN NOT NULL DEFAULT FALSE,
    condicoes           JSONB,                   -- regras adicionais livres
    criado_em           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_linhas_seguradora  ON linhas_de_corte(seguradora_id);
CREATE INDEX idx_linhas_modalidade  ON linhas_de_corte(modalidade);

CREATE TRIGGER trg_linhas_atualizado_em
    BEFORE UPDATE ON linhas_de_corte
    FOR EACH ROW EXECUTE FUNCTION set_atualizado_em();

-- Função que retorna seguradoras elegíveis para uma operação.
-- Aplica regra inviolável: Mapfre é excluída de Seguro Garantia.
-- Cosseguro só acima de R$ 200M de IS.
CREATE OR REPLACE FUNCTION filtrar_seguradoras(
    p_modalidade        TEXT,
    p_valor_is          NUMERIC,
    p_prazo_meses       INTEGER DEFAULT NULL
)
RETURNS TABLE (
    seguradora_id  UUID,
    nome           TEXT,
    modalidade     TEXT,
    requer_cosseguro BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT  s.id,
            s.nome,
            lc.modalidade,
            lc.requer_cosseguro
    FROM    seguradoras s
    JOIN    linhas_de_corte lc ON lc.seguradora_id = s.id
    WHERE   s.ativa = TRUE
      AND   lc.modalidade  = p_modalidade
      AND   p_valor_is     >= lc.is_minimo
      AND   (lc.is_maximo IS NULL OR p_valor_is <= lc.is_maximo)
      AND   (p_prazo_meses IS NULL
             OR lc.prazo_maximo_meses IS NULL
             OR p_prazo_meses <= lc.prazo_maximo_meses)
      -- Cosseguro só acima de R$ 200M
      AND   (lc.requer_cosseguro = FALSE OR p_valor_is > 200000000)
      -- Mapfre inativa em Seguro Garantia (regra de negócio inviolável)
      AND   s.nome NOT ILIKE '%mapfre%'
    ORDER BY s.nome;
END;
$$ LANGUAGE plpgsql STABLE;
