# Test file to test the insert_transaction function, making sure it can insert to the supabase.
# Imports
import os
import sys
import requests
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)
from db.supabase_functions import insert_transaction_supabase
from db.supabase_client import get_supabase_anon
from flows.pdf_parser import parse_pdf
from flows.ai_parser import parse_ai_json
from ai.gemini_client import extract_transactions
from pathlib import Path


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

    # Extract file path
    pdf_path = Path("D:\Download\PaySlip (1).pdf")
    pdf_text = parse_pdf(pdf_path)

    if not pdf_text.strip():
        print("error" + "No text found in PDF")
    
    print("AI is reading the file......")
    # Extract the JSON form from ai
    result = extract_transactions(pdf_text,SUPABASE_CLIENT_ANON)
    
    # Take the JSON object.
    parse_ai = parse_ai_json(result)
    print(parse_ai)
    insert_transaction_supabase(SUPABASE_CLIENT_ANON, parse_ai)
    