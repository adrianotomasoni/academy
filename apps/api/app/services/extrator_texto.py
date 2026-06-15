"""
Extração de texto de PDF e Word, com OCR para PDFs escaneados.
Dependências: pymupdf (fitz), python-docx, boto3 (Textract opcional).
"""
import fitz  # PyMuPDF
from docx import Document as DocxDocument


def extrair_texto(arquivo_path: str, arquivo_tipo: str) -> tuple[str, bool, int]:
    """
    Returns: (texto, usou_ocr, n_paginas)
    """
    if arquivo_tipo == "pdf":
        return _extrair_pdf(arquivo_path)
    elif arquivo_tipo in ("docx", "doc"):
        return _extrair_docx(arquivo_path), False, 0
    raise ValueError(f"Tipo não suportado: {arquivo_tipo}")


def _extrair_pdf(path: str) -> tuple[str, bool, int]:
    doc = fitz.open(path)
    n_paginas = len(doc)
    partes = []
    usou_ocr = False

    for page in doc:
        txt = page.get_text().strip()
        if len(txt) < 50:
            # Página provavelmente escaneada -> OCR
            txt = _ocr_pagina(page)
            usou_ocr = True
        partes.append(txt)

    doc.close()
    return "\n\n".join(partes), usou_ocr, n_paginas


def _ocr_pagina(page) -> str:
    """
    OCR de uma página. Implementação placeholder.
    Em produção: renderizar a página como imagem e enviar ao AWS Textract
    ou Google Document AI. Ver docs/04-ocr-setup.md.
    """
    # pix = page.get_pixmap(dpi=200)
    # img_bytes = pix.tobytes("png")
    # return textract_detect(img_bytes)
    return ""  # TODO: integrar Textract


def _extrair_docx(path: str) -> str:
    doc = DocxDocument(path)
    partes = [p.text for p in doc.paragraphs if p.text.strip()]
    # Também extrai tabelas
    for tabela in doc.tables:
        for linha in tabela.rows:
            celulas = [c.text.strip() for c in linha.cells if c.text.strip()]
            if celulas:
                partes.append(" | ".join(celulas))
    return "\n".join(partes)


def dividir_em_chunks(texto: str, max_chars: int = 12000) -> list[str]:
    """
    Divide o texto em chunks respeitando quebras de seção quando possível.
    Editais longos são divididos; contratos curtos ficam em um único chunk.
    """
    if len(texto) <= max_chars:
        return [texto]

    # Divide por parágrafos, agrupando até max_chars
    paragrafos = texto.split("\n\n")
    chunks, atual = [], ""
    for p in paragrafos:
        if len(atual) + len(p) > max_chars and atual:
            chunks.append(atual)
            atual = p
        else:
            atual += "\n\n" + p
    if atual:
        chunks.append(atual)
    return chunks
