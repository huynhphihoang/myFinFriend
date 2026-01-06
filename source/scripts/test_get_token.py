from dotenv import load_dotenv
import requests
import os

# Load environment variables from .env file first
load_dotenv()

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
    TOKEN = login_and_get_token(
        email="11a4huynhphihoang06@gmail.com",
        password="12345678910"
    )
    
    print(TOKEN)

