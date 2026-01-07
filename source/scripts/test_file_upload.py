from db.supabase_functions import upload_file_supabase, verify_upload_status
from db.supabase_client import get_supabase_anon
from pathlib import Path
import requests
import mimetypes

from db.supabase_functions import login_and_get_token

if __name__ == "__main__":

    token=login_and_get_token(
        email="11a4huynhphihoang06@gmail.com",
        password="12345678910"
    )

    SUPABASE_CLIENT_ANON = get_supabase_anon(token)

    SUPABASE_CLIENT_ANON.auth.set_session(
        access_token=token,
        refresh_token=""
    )

    # Extract file path
    file_path = Path("/mnt/c/Users/hoang/OneDrive/Documents/GitHub/myFinFriend/source/scripts/test_analytical_functions.csv")

    # Extract file name
    file_name = file_path.name

    # Store the file as bytes
    with open(file_path, "rb") as f:
        file_bytes: bytes = f.read()

    # Manual MIME type storing
    # mime_type = "application/pdf"

    # Store its MIME type automatically
    mime_type, _ = mimetypes.guess_type(file_path)

    # Call upload_file_supabase
    storage_path = upload_file_supabase(SUPABASE_CLIENT_ANON,file_bytes,file_name,mime_type)

    print(f"This is the storage path {storage_path}")

    # Verify if the file is uploaded
    print(verify_upload_status(file_name,SUPABASE_CLIENT_ANON))
    