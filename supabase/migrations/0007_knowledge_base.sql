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
