## This file contains ALL functions that have READ, INSERT, UPDATE operations to the remote database SUPABASE
## This file is to be used in junction with supabase_client.py

# Imports for specifying the return types
from typing import List, Dict, Any

# USE SUPABASE_CLIENT_SERVICE from supabase_client_service.py for this function 
def get_transaction_categories_with_ids(SUPABASE_CLIENT_SERVICE) -> list:
    """
    Fetch transaction categories with their IDs from Supabase transaction_categories table.
    
    Schema:
        - category_id: int2
        - category_name: VARCHAR
    
    Returns:
        list: List of dictionaries with category_id and category_name
    """
    try:
        # Fetch all categories with IDs
        response = SUPABASE_CLIENT_SERVICE.table("Category List").select("category_id, category_name").execute()
        
        return response.data if response.data else []
    except Exception as e:
        print(f"Error fetching transaction categories: {e}")
        return []

# Function to upload pdf/csv file to supabase
def upload_file_supabase(SUPABASE_CLIENT_ANON,pdf_path):
    

## This function inserts a single transaction into supabase db, USE ANON_CLIENT for this so supabase link the auth.id() to users.id()
def insert_transaction_supabase(
        SUPABASE_CLIENT_ANON,
        transaction: Dict[str, Any]
)->Dict[str, Any]:
    response = (
        SUPABASE_CLIENT_ANON
        .table("Transaction History")
        .insert({
            "transaction_date": transaction["transaction_date"],
            "transaction_details": transaction["transaction_details"],
            "transaction_amount": transaction["transaction_amount"],
            "transaction_category": transaction["transaction_category"],
            "transaction_type": transaction["transaction_type"],
        })
        .execute()
    )

    if response.error:
        raise RuntimeError(response.error.message)
    
## This function SELECT a list of transactions from supabase, with RLS: Users can read their own rows
def get_transactions_from_supabase(SUPABASE_CLIENT_ANON) ->  List[Dict[str, Any]]:
    response = (
        SUPABASE_CLIENT_ANON
        .table("Transaction History")
        .select(
            "transaction_id, "
            "transaction_amount, "
            "transaction_details, "
            "transaction_date, "
            "transaction_category"
        )
        .order("transaction_date",desc=False)
        .execute()
    )

    if response.error:
        raise RuntimeError(response.error.message)
    
    return response.data

