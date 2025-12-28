import pdfplumber as pp
# Function to parse the PDF file or path to a PDF file
# Accepts 1 page pdf only
def parse_pdf(pdf_path):
    with pp.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            return text