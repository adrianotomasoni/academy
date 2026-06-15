"""
Script de ingestão da base de conhecimento no Supabase (pgvector).
Lê todos os .md do repositório de conhecimento, divide por seção (##),
gera embeddings e insere em documentos_kb.

Uso:
    python scripts/ingest_knowledge_base.py --path ../knowledge-base/agente-seguro-garantia
"""
import os
import argparse
import glob
from openai import OpenAI
from supabase import create_client

openai = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
supabase = create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_SERVICE_KEY"])


def chunk_markdown(conteudo: str, titulo_arquivo: str):
    """Divide um .md por headings ## em chunks."""
    chunks, atual, subtitulo = [], [], titulo_arquivo
    for linha in conteudo.split("\n"):
        if linha.startswith("## "):
            if atual:
                chunks.append((subtitulo, "\n".join(atual)))
                atual = []
            subtitulo = linha.replace("## ", "").strip()
        else:
            atual.append(linha)
    if atual:
        chunks.append((subtitulo, "\n".join(atual)))
    return chunks


def grupo_de_caminho(path: str) -> str:
    partes = path.split(os.sep)
    for p in partes:
        if p[:2].isdigit() and "_" in p:
            return p
    return "geral"


def main(base_path: str):
    arquivos = glob.glob(os.path.join(base_path, "**", "*.md"), recursive=True)
    print(f"Encontrados {len(arquivos)} arquivos .md")

    total = 0
    for arq in arquivos:
        with open(arq, encoding="utf-8") as f:
            conteudo = f.read()
        titulo = os.path.basename(arq).replace(".md", "").replace("-", " ").title()
        grupo = grupo_de_caminho(arq)
        rel = os.path.relpath(arq, base_path)

        for subtitulo, texto in chunk_markdown(conteudo, titulo):
            if len(texto.strip()) < 40:
                continue
            emb = openai.embeddings.create(
                model="text-embedding-3-small", input=texto
            ).data[0].embedding

            supabase.table("documentos_kb").insert({
                "titulo": titulo,
                "subtitulo": subtitulo,
                "grupo": grupo,
                "conteudo": texto,
                "embedding": emb,
                "fonte_arquivo": rel,
                "publico": True,
            }).execute()
            total += 1
            print(f"  + {rel} :: {subtitulo[:50]}")

    print(f"\nConcluído: {total} chunks inseridos.")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--path", required=True, help="Caminho da base de conhecimento")
    args = ap.parse_args()
    main(args.path)
