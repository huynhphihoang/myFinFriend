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
from db.supabase_functions import login_and_get_token
from pathlib import Path


if __name__ == "__main__":
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
    