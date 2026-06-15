"""Configuração central da API — carrega variáveis de ambiente."""
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # App
    app_name: str = "Traderisk Academy API"
    environment: str = "development"
    debug: bool = True

    # Supabase
    supabase_url: str
    supabase_service_key: str   # service_role (backend apenas — NUNCA expor)
    supabase_anon_key: str

    # Anthropic (Claude)
    anthropic_api_key: str
    claude_model: str = "claude-sonnet-4-6"

    # OpenAI (embeddings)
    openai_api_key: str
    embedding_model: str = "text-embedding-3-small"

    # Integrações externas
    apibrasil_token: str = ""
    apibrasil_device_token: str = ""
    datajud_api_key: str = ""
    escavador_token: str = ""

    # Stripe
    stripe_secret_key: str = ""
    stripe_webhook_secret: str = ""

    # AWS (OCR via Textract) — opcional
    aws_access_key_id: str = ""
    aws_secret_access_key: str = ""
    aws_region: str = "sa-east-1"

    # Limites de plano
    free_chat_limit: int = 10
    free_analise_limit: int = 3

    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()
