import tempfile, os
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from app.services import analise_documento
from app.core.auth import get_current_user, checar_limite_analise

router = APIRouter(prefix="/analise", tags=["analise"])

EXT_PERMITIDAS = {"pdf": "pdf", "docx": "docx", "doc": "doc"}


@router.post("/contrato")
async def analisar(file: UploadFile = File(...), user=Depends(get_current_user)):
    checar_limite_analise(user)
    ext = file.filename.rsplit(".", 1)[-1].lower()
    if ext not in EXT_PERMITIDAS:
        raise HTTPException(400, "Formato não suportado. Use PDF ou Word.")

    with tempfile.NamedTemporaryFile(delete=False, suffix=f".{ext}") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    try:
        resultado = analise_documento.analisar_documento(tmp_path, EXT_PERMITIDAS[ext])
    finally:
        os.unlink(tmp_path)

    return resultado
