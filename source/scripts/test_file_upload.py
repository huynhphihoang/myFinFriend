from db.supabase_functions import upload_file_supabase, verify_upload_status
from db.supabase_client import get_supabase_anon
from pathlib import Path
import requests
import mimetypes
import os

if __name__ == "__main__":
    # Get the URL and the ANON KEY from .env file
    SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    SUPABASE_ANON_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY")

    # Create the get token function
    def login_and_get_token(email, password):
        url = f"{SUPABASE_URL}/auth/v1/token?grant_type=password"

        headers = {
            "apikey": SUPABASE_ANON_KEY,
            "Content-Type": "application/json",
        }

        payload = {
            "email": email,
            "password": password,
        }

        res = requests.post(url, json=payload, headers=headers)
        res.raise_for_status()

        return res.json()["access_token"]

    # TEST USER and print it.
    token = login_and_get_token(
        email="11a4huynhphihoang06@gmail.com",
        password="12345678910"
    )   

    print(token)

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
    