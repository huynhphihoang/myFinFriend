# Parse pdf or csv file into text
def parse_file(file_bytes: bytes, mime_type:str) -> str:
    if mime_type == "application/pdf":
        return _parse_pdf(file_bytes)

    elif mime_type == "text/csv":
        return _parse_csv(file_bytes)

    else:
        raise ValueError(f"Unsupported file type: {mime_type}")


def _parse_pdf(file_bytes: bytes) -> str:
    import io
    import pdfplumber as pp

    text_chunks = []
    with pp.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                text_chunks.append(text)

    return "\n".join(text_chunks)

def _parse_csv(file_bytes: bytes) -> str:
    import io, csv

    text_stream = io.StringIO(file_bytes.decode("utf-8"))
    reader = csv.reader(text_stream)

    return "\n".join(", ".join(row) for row in reader)