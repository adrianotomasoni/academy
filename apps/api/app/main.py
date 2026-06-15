"""Traderisk Academy API — entrypoint FastAPI."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.routers import chat, dossie, analise, seguradoras, health, processos

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="API da plataforma de inteligência em Seguro Garantia da Traderisk.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://academy.traderisk.com.br"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(chat.router)
app.include_router(dossie.router)
app.include_router(processos.router)
app.include_router(analise.router)
app.include_router(seguradoras.router)


@app.get("/")
def root():
    return {"service": settings.app_name, "status": "online"}
