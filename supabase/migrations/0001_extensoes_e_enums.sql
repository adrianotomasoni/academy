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
