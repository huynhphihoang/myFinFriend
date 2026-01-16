from db.supabase_functions import insert_transaction_supabase,get_transactions_from_supabase,update_transaction, delete_transaction
from db.supabase_client import get_supabase_anon
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

    # Updated transaction
    # updated = {
    #     "transaction_id": 18,
    #     "transaction_amount": 200,
    #     "transaction_details" : "Salary Payment",
    #     "transaction_date":"2025-12-15",
    #     "category_name":"Income"
    # }

    # updated_transaction = update_transaction(SUPABASE_CLIENT_ANON,updated)

    # print(updated_transaction)

    # Test deleting the transaction above

    delete_transaction(SUPABASE_CLIENT_ANON,18)


