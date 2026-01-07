import pdfplumber as pp
import csv 
from pathlib import Path
from typing import Union

# Parse pdf or csv file into text
def parse_file(file_path: Union[str,Path]) -> str:
    file_path = Path(file_path)
    suffix = file_path.suffix.lower()

    if suffix == ".pdf":
        return _parse_pdf(file_path)

    elif suffix == ".csv":
        return _parse_csv(file_path)

    else:
        raise ValueError(f"Unsupported file type: {suffix}")


def _parse_pdf(pdf_path: Path) -> str:
    with pp.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            return text

def _parse_csv(csv_path: Path) -> str:
    """Parse a CSV file into text."""
    lines = []

    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        for row in reader:
            lines.append(", ".join(row))

    return "\n".join(lines)