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
