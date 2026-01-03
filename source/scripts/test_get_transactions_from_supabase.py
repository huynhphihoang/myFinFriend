import sys
import os
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)
from db.supabase_client import get_supabase_anon
from db.supabase_functions import get_transactions_from_supabase


if __name__ == "__main__":
    
    # An example token in the document.
    token=os.getenv("TOKEN_ACCESS")   
    
    SUPABASE_CLIENT_ANON = get_supabase_anon(token)

    result = (
        SUPABASE_CLIENT_ANON.table("transaction_history")
        .select("*")
        .execute()
    )

    rows = result.data
    print(rows)