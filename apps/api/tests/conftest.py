"""Configuração compartilhada dos testes.

Define variáveis de ambiente mínimas antes de qualquer import de ``app.*``,
para que ``Settings`` (pydantic-settings) carregue sem exigir um .env real.
Espelha o bloco ``env`` do CI em .github/workflows/ci.yml.
"""
import os

os.environ.setdefault("SUPABASE_URL", "https://example.supabase.co")
os.environ.setdefault("SUPABASE_SERVICE_KEY", "test")
os.environ.setdefault("SUPABASE_ANON_KEY", "test")
os.environ.setdefault("ANTHROPIC_API_KEY", "test")
os.environ.setdefault("OPENAI_API_KEY", "test")
