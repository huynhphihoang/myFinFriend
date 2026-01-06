import requests
import sys
import os
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)
from db.supabase_client import get_supabase_anon
from db.supabase_functions import get_transactions_from_supabase


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

    # get the token from the example user.
    TOKEN = login_and_get_token(
        email="11a4huynhphihoang06@gmail.com",
        password="12345678910"
    )
    
    # Get the client supabase 
    SUPABASE_CLIENT_ANON = get_supabase_anon(TOKEN)

    # Get all information from transaction history
    result = get_transactions_from_supabase(SUPABASE_CLIENT_ANON)

    print(result)