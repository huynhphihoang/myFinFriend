from db.supabase_functions import upload_file_supabase, verify_upload_status
from db.supabase_client import get_supabase_anon
from pathlib import Path
import mimetypes

from db.supabase_functions import login_and_get_token

if __name__ == "__main__":

    token=login_and_get_token(
        email="11a4huynhphihoang06@gmail.com",
        password="12345678910"
    )

    SUPABASE_CLIENT_ANON = get_supabase_anon(token)

    # Extract file path
    pdf_path = Path("/mnt/c/Users/hoang/OneDrive/Documents/Work/Qantas Lounge/Payslips/Payslip_625313_20250401.pdf")

    # Extract file name
    file_name = pdf_path.name

    # Store the file as bytes
    with open(pdf_path, "rb") as f:
        file_bytes: bytes = f.read()

    # Manual MIME type storing
    # mime_type = "application/pdf"

    # Store its MIME type automatically
    mime_type, _ = mimetypes.guess_type(pdf_path)

    # Call upload_file_supabase
    storage_path = upload_file_supabase(SUPABASE_CLIENT_ANON,file_bytes,file_name,mime_type)

    print(f"This is the storage path {storage_path}")

    # Verify if the file is uploaded
    print(verify_upload_status(file_name,SUPABASE_CLIENT_ANON))
    