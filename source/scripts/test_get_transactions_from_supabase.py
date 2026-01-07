import requests
import sys
import os
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)
from db.supabase_client import get_supabase_anon
from db.supabase_functions import get_transactions_from_supabase
from db.supabase_functions import login_and_get_token


if __name__ == "__main__":
    # Get the token from the example user.
    TOKEN = login_and_get_token(
        email="11a4huynhphihoang06@gmail.com",
        password="12345678910"
    )
    
    # Get the client supabase 
    SUPABASE_CLIENT_ANON = get_supabase_anon(TOKEN)

    # Get all information from transaction history
    result = get_transactions_from_supabase(SUPABASE_CLIENT_ANON)

    print(result)