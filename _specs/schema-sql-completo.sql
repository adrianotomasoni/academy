-- ============================================================================
-- SCHEMA SQL COMPLETO — Traderisk Academy (REFERENCIA)
-- Concatenacao das migrations supabase/migrations/0001..0010 em ordem.
-- NAO e a fonte da verdade: as migrations versionadas em supabase/migrations/
-- continuam sendo o que se aplica ao banco. Este arquivo e so consulta rapida.
-- Gerado em 2026-06-22.
-- ============================================================================


-- ============================================================================
-- ===== 0001_extensoes_e_enums.sql =====
-- ============================================================================

-- Migration 0001 — Extensões e Enums
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE perfil_usuario   AS ENUM ('corretor', 'tomador', 'advogado', 'admin');
CREATE TYPE plano_usuario    AS ENUM ('free', 'pro_corretor', 'pro_tomador');
CREATE TYPE status_assinatura AS ENUM ('ativa', 'cancelada', 'expirada', 'trial');
CREATE TYPE grupo_modalidade AS ENUM ('judicial', 'tradicional', 'estruturada', 'financeira');
CREATE TYPE polo_processo    AS ENUM ('ativo', 'passivo', 'nao_identificado');
CREATE TYPE status_oportunidade AS ENUM ('nova','visualizada','contatada','em_cotacao','convertida','descartada');
CREATE TYPE status_analise   AS ENUM ('processando', 'concluida', 'erro');
CREATE TYPE tipo_documento   AS ENUM ('edital_licitacao','contrato_administrativo','contrato_privado','termo_aditivo','ata_registro_preco','outro');
CREATE TYPE nivel_impedimento AS ENUM ('bloqueador', 'alerta', 'informacao');

-- Trigger util para atualizado_em
CREATE OR REPLACE FUNCTION set_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN NEW.atualizado_em = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ===== 0002_usuarios_assinaturas.sql =====
-- ============================================================================

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

-- ============================================================================
-- ===== 0003_tomadores.sql =====
-- ============================================================================

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

-- ============================================================================
-- ===== 0004_processos_contratos_restritivos.sql =====
-- ============================================================================

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

-- ============================================================================
-- ===== 0005_analises_financeiras.sql =====
-- ============================================================================

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

-- ============================================================================
-- ===== 0006_seguradoras_modalidades.sql =====
-- ============================================================================

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

-- ============================================================================
-- ===== 0007_knowledge_base.sql =====
-- ============================================================================

-- Migration 0007 — Knowledge Base (RAG), legislação e condições gerais

-- Tabela principal de embeddings — alimentada pelo script ingest_knowledge_base.py
CREATE TABLE documentos_kb (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo        TEXT NOT NULL,
    subtitulo     TEXT,
    grupo         TEXT,                -- ex: '00_NUCLEO', '02_GRUPOS_DE_MODALIDADES'
    conteudo      TEXT NOT NULL,
    fonte_arquivo TEXT,
    embedding     vector(1536),        -- OpenAI text-embedding-3-small
    criado_em     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice HNSW para busca semântica eficiente (melhor que IVFFlat para tabelas < 1M linhas)
CREATE INDEX idx_kb_embedding ON documentos_kb
    USING hnsw (embedding vector_cosine_ops)
    WITH (m = 16, ef_construction = 64);

-- Função de busca semântica usada pelo serviço de chat
CREATE OR REPLACE FUNCTION buscar_conhecimento(
    query_embedding    vector(1536),
    match_count        INTEGER DEFAULT 5,
    similarity_threshold FLOAT  DEFAULT 0.7
)
RETURNS TABLE (
    id         UUID,
    titulo     TEXT,
    subtitulo  TEXT,
    conteudo   TEXT,
    grupo      TEXT,
    similarity FLOAT
) AS $$
BEGIN
    RETURN QUERY
    SELECT  d.id,
            d.titulo,
            d.subtitulo,
            d.conteudo,
            d.grupo,
            (1 - (d.embedding <=> query_embedding))::FLOAT AS similarity
    FROM    documentos_kb d
    WHERE   (1 - (d.embedding <=> query_embedding)) > similarity_threshold
    ORDER BY d.embedding <=> query_embedding
    LIMIT   match_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- Referências normativas (alimentadas manualmente ou via script)
CREATE TABLE legislacao (
    id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    norma     TEXT NOT NULL,           -- ex: 'Lei 8.666/1993'
    artigo    TEXT,
    ementa    TEXT,
    texto     TEXT,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Condições gerais das seguradoras (PDFs no Storage)
CREATE TABLE condicoes_gerais (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seguradora_id UUID REFERENCES seguradoras(id) ON DELETE SET NULL,
    modalidade    TEXT NOT NULL,
    arquivo_url   TEXT,               -- URL privada no Supabase Storage
    versao        TEXT,
    vigente       BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_cg_seguradora  ON condicoes_gerais(seguradora_id);
CREATE INDEX idx_cg_modalidade  ON condicoes_gerais(modalidade);

-- ============================================================================
-- ===== 0008_oportunidades_alertas.sql =====
-- ============================================================================

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

-- ============================================================================
-- ===== 0009_analises_documentos_regras.sql =====
-- ============================================================================

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

-- ============================================================================
-- ===== 0010_rls_seed.sql =====
-- ============================================================================

-- Migration 0010 — RLS (Row Level Security) e dados iniciais (seed)

-- ─────────────────────────────────────────────
-- RLS
-- ─────────────────────────────────────────────

ALTER TABLE usuarios              ENABLE ROW LEVEL SECURITY;
ALTER TABLE assinaturas           ENABLE ROW LEVEL SECURITY;
ALTER TABLE uso_mensal            ENABLE ROW LEVEL SECURITY;
ALTER TABLE tomadores             ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuario_tomador       ENABLE ROW LEVEL SECURITY;
ALTER TABLE processos_judiciais   ENABLE ROW LEVEL SECURITY;
ALTER TABLE contratos_publicos    ENABLE ROW LEVEL SECURITY;
ALTER TABLE restritivos           ENABLE ROW LEVEL SECURITY;
ALTER TABLE analises_financeiras  ENABLE ROW LEVEL SECURITY;
ALTER TABLE oportunidades_judiciais ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas_processuais   ENABLE ROW LEVEL SECURITY;
ALTER TABLE analises_documentos   ENABLE ROW LEVEL SECURITY;

-- Tabelas de referência: leitura para todos os autenticados (sem RLS restritivo)
ALTER TABLE seguradoras     ENABLE ROW LEVEL SECURITY;
ALTER TABLE modalidades     ENABLE ROW LEVEL SECURITY;
ALTER TABLE linhas_de_corte ENABLE ROW LEVEL SECURITY;
ALTER TABLE legislacao      ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos_kb   ENABLE ROW LEVEL SECURITY;
ALTER TABLE condicoes_gerais ENABLE ROW LEVEL SECURITY;
ALTER TABLE regras_impedimento ENABLE ROW LEVEL SECURITY;

-- Policies: dados pessoais (apenas o próprio usuário)
CREATE POLICY "usuarios: próprio"          ON usuarios           FOR ALL USING (auth_id = auth.uid());
CREATE POLICY "assinaturas: próprio"       ON assinaturas        FOR ALL USING (usuario_id IN (SELECT id FROM usuarios WHERE auth_id = auth.uid()));
CREATE POLICY "uso_mensal: próprio"        ON uso_mensal         FOR ALL USING (usuario_id IN (SELECT id FROM usuarios WHERE auth_id = auth.uid()));
CREATE POLICY "usuario_tomador: próprio"   ON usuario_tomador    FOR ALL USING (usuario_id IN (SELECT id FROM usuarios WHERE auth_id = auth.uid()));
CREATE POLICY "oportunidades: próprio"     ON oportunidades_judiciais FOR ALL USING (usuario_id IN (SELECT id FROM usuarios WHERE auth_id = auth.uid()));
CREATE POLICY "alertas: próprio"           ON alertas_processuais     FOR ALL USING (usuario_id IN (SELECT id FROM usuarios WHERE auth_id = auth.uid()));
CREATE POLICY "analises_doc: próprio"      ON analises_documentos     FOR ALL USING (usuario_id IN (SELECT id FROM usuarios WHERE auth_id = auth.uid()));
CREATE POLICY "analises_fin: próprio"      ON analises_financeiras    FOR ALL USING (usuario_id IN (SELECT id FROM usuarios WHERE auth_id = auth.uid()));

-- Tomadores: visível se o usuário tem vínculo
CREATE POLICY "tomadores: vinculados"
    ON tomadores FOR SELECT
    USING (id IN (
        SELECT tomador_id FROM usuario_tomador
        WHERE usuario_id IN (SELECT id FROM usuarios WHERE auth_id = auth.uid())
    ));

CREATE POLICY "tomadores: insert próprio"
    ON tomadores FOR INSERT
    WITH CHECK (TRUE);

-- Processos e contratos: visível via tomador vinculado
CREATE POLICY "processos: via tomador"
    ON processos_judiciais FOR SELECT
    USING (tomador_id IN (
        SELECT tomador_id FROM usuario_tomador
        WHERE usuario_id IN (SELECT id FROM usuarios WHERE auth_id = auth.uid())
    ));

CREATE POLICY "contratos: via tomador"
    ON contratos_publicos FOR SELECT
    USING (tomador_id IN (
        SELECT tomador_id FROM usuario_tomador
        WHERE usuario_id IN (SELECT id FROM usuarios WHERE auth_id = auth.uid())
    ));

CREATE POLICY "restritivos: via tomador"
    ON restritivos FOR SELECT
    USING (tomador_id IN (
        SELECT tomador_id FROM usuario_tomador
        WHERE usuario_id IN (SELECT id FROM usuarios WHERE auth_id = auth.uid())
    ));

-- Tabelas de referência: leitura pública para autenticados
CREATE POLICY "seguradoras: leitura"       ON seguradoras      FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "modalidades: leitura"       ON modalidades      FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "linhas_de_corte: leitura"   ON linhas_de_corte  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "legislacao: leitura"        ON legislacao       FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "documentos_kb: leitura"     ON documentos_kb    FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "condicoes_gerais: leitura"  ON condicoes_gerais FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "regras_impedimento: leitura" ON regras_impedimento FOR SELECT USING (auth.role() = 'authenticated');


-- ─────────────────────────────────────────────
-- SEED — Dados iniciais
-- ─────────────────────────────────────────────

-- Seguradoras ativas em Seguro Garantia (Mapfre excluída por regra inviolável)
INSERT INTO seguradoras (nome, ativa, rating) VALUES
    ('Junto Seguros',          TRUE, 'A'),
    ('Tokio Marine',           TRUE, 'AA-'),
    ('Sompo Seguros',          TRUE, 'A+'),
    ('Pottencial Seguradora',  TRUE, 'A-'),
    ('Zurich Seguros',         TRUE, 'AA'),
    ('Swiss Re',               TRUE, 'AA+'),
    ('Chubb',                  TRUE, 'AA'),
    ('AIG',                    TRUE, 'A+'),
    ('Avla Seguradora',        TRUE, 'A-'),
    ('Excelsior Seguros',      TRUE, 'BBB+'),
    ('Sancor Seguros',         TRUE, 'A-'),
    ('Austral Seguradora',     TRUE, 'A'),
    ('IRB Brasil RE',          TRUE, 'BBB'),
    ('Mapfre',                 FALSE, 'A')   -- inativa em Seguro Garantia
ON CONFLICT (nome) DO NOTHING;

-- Regras de impedimento (bloqueadores B1-B6 e alertas A1-A9)
INSERT INTO regras_impedimento (codigo, nivel, descricao, detalhe) VALUES
    ('B1', 'bloqueador', 'Vigência superior a 60 meses',
        'Contratos com prazo de vigência acima de 60 meses não são aceitos pelo mercado segurador de garantia.'),
    ('B2', 'bloqueador', 'Indenização trabalhista administrativa antes do judicial',
        'Cláusula que obriga indenização trabalhista em fase administrativa (pré-judicial) extrapola o escopo da garantia.'),
    ('B3', 'bloqueador', 'Cancelamento unilateral sem anuência do beneficiário',
        'Cláusula que permite ao tomador cancelar a apólice sem aprovação do beneficiário invalida a proteção.'),
    ('B4', 'bloqueador', 'Danos punitivos no escopo da garantia',
        'Danos punitivos ou exemplares não são cobertos por apólices de seguro garantia.'),
    ('B5', 'bloqueador', 'Prazo indeterminado',
        'Vigência sem data de término definida é incompatível com o produto de seguro garantia.'),
    ('B6', 'bloqueador', 'Objeto ilícito ou proibido',
        'O objeto contratual não pode ser ilícito, imoral ou proibido por lei.'),
    ('A1', 'alerta', 'Cosseguro exigido',
        'A operação requer cosseguro — somente possível acima de R$ 200M de IS. Verificar elegibilidade.'),
    ('A2', 'alerta', 'Pagamento antecipado de indenização',
        'Cláusula de pagamento antes do trânsito em julgado exige análise detalhada e aprovação da seguradora.'),
    ('A3', 'alerta', 'Retenção ou desconto de prêmio na indenização',
        'Previsão de retenção do prêmio no valor da indenização deve ser negociada caso a caso.'),
    ('A4', 'alerta', 'Renovação automática',
        'Renovação automática sem notificação pode gerar exposição não precificada.'),
    ('A5', 'alerta', 'Step-in rights',
        'Direito do beneficiário de assumir a execução requer cláusula específica aceita pela seguradora.'),
    ('A6', 'alerta', 'Garantia de manutenção incluída',
        'Período de manutenção pós-obra incluído no escopo principal — prazo total deve ser revisto.'),
    ('A7', 'alerta', 'Multa moratória acima de 10%',
        'Multa por atraso superior a 10% do valor do contrato pode não ser coberta integralmente.'),
    ('A8', 'alerta', 'Beneficiário pessoa física',
        'Beneficiário pessoa física requer avaliação adicional e pode ser rejeitado por algumas seguradoras.'),
    ('A9', 'alerta', 'Objeto de alto risco operacional',
        'Contratos de infraestrutura crítica, segurança pública ou saúde exigem subscrição especializada.')
ON CONFLICT (codigo) DO NOTHING;
