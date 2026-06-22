"""Configuração compartilhada dos testes.

Define variáveis de ambiente mínimas antes de qualquer import de ``app.*``,
para que ``Settings`` (pydantic-settings) carregue sem exigir um .env real.
Espelha o bloco ``env`` do CI em .github/workflows/ci.yml.

Também garante que ``apps/api`` esteja no ``sys.path`` para que ``import app``
funcione quando o pytest é executado a partir da raiz do repositório
(ex.: ``pytest apps/api/tests`` no CI).
"""
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

os.environ.setdefault("SUPABASE_URL", "https://example.supabase.co")
os.environ.setdefault("SUPABASE_SERVICE_KEY", "test")
os.environ.setdefault("SUPABASE_ANON_KEY", "test")
os.environ.setdefault("ANTHROPIC_API_KEY", "test")
os.environ.setdefault("OPENAI_API_KEY", "test")
