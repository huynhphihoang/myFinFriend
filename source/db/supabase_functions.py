# This file contains ALL functions that have READ, INSERT, UPDATE operations to the remote database SUPABASE
# This file is to be used in junction with supabase_client.py

# Imports for specifying the return types
from typing import List, Dict, Any
from flask import jsonify

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
        response = SUPABASE_CLIENT_SERVICE.table("category_list").select("category_id, category_name").execute()
        
        return response.data if response.data else []
    except Exception as e:
        print(f"Error fetching transaction categories: {e}")
        return []

# Function to upload pdf/csv file to supabase with parameters: 
# SUPABASE_CLIENT_ANON -> get_supabase_anon(); file_bytes: bytes
# supabase: Supabase ANON client with user session
# file_bytes (bytes): Raw file bytes
# filename (str): Original filename
# mime_type (str): File MIME type
def upload_file_supabase(SUPABASE_CLIENT_ANON, file_bytes: bytes, filename: str, mime_type: str):
    # Extract the current user_id
    current_uid = SUPABASE_CLIENT_ANON.auth.get_user().user.id
    
    # Upload to supabase storage bucket
    storage_path = f"{current_uid}/{filename}"

    upload_request = (
        SUPABASE_CLIENT_ANON
        .storage
        .from_("Upload Storage")
        .upload(
            path=storage_path,
            file=file_bytes,
            file_options={
                "content-type": mime_type,
                "upsert": False
            }
        )
    )

    # Insert new row into "upload_storage table"
    insert_upload_storage = (
        SUPABASE_CLIENT_ANON
        .table("upload_storage")
        .insert({
            "upload_status" : False,
            "storage_path":storage_path
        })
        .execute()
    )

    return {
        "storage_path": storage_path
    }
    

# This function is used to verify the upload_status of a file based on its file_name
def verify_upload_status(
        filename: str,
        SUPABASE_CLIENT_ANON
) -> bool:
    # Extract the user_id()
    user_id = SUPABASE_CLIENT_ANON.auth.get_user().user.id
    

    # Extract files visible to this user
    files_visible = (
        SUPABASE_CLIENT_ANON
        .storage
        .from_("Upload Storage")
        .list(path=user_id)
    )
    
    filenames = {f["name"] for f in files_visible}

    if filename not in filenames:
        return False
    
    # Update upload_status
    update_upload_storage = (
        SUPABASE_CLIENT_ANON
        .table("upload_storage")
        .update({"upload_status":True})
        .eq("user_id", user_id)
        .eq("upload_status", False)
        .execute()
    )

    return True

# This function INSERT a single transaction into supabase db, USE ANON_CLIENT for this so supabase link the auth.id() to users.id()
def insert_transaction_supabase(
        SUPABASE_CLIENT_ANON,
        transaction: Dict[str, Any]
)->Dict[str, Any]:
    try:
        response = (
            SUPABASE_CLIENT_ANON
            .table("transaction_history")
            .insert({
            "transaction_date": transaction["transaction_date"],
            "transaction_details": transaction["transaction_details"],
            "transaction_amount": float(transaction["transaction_amount"]),
            "transaction_category_id": int(transaction["transaction_category_id"]),
            })
            .execute()
        )

    except Exception as e:
        raise RuntimeError(f"Insert transaction supabase failed: {e}")
    
# This function SELECT a list of transactions from supabase, with RLS: Users can read their own rows
def get_transactions_from_supabase(SUPABASE_CLIENT_ANON) ->  List[Dict[str, Any]]:
    try: 
        response = (
            SUPABASE_CLIENT_ANON
            .table("transaction_history")
            .select(
                "transaction_id, "
                "transaction_amount, "
                "transaction_details, "
                "transaction_date, "
                "transaction_category_id"
            )
            .order("transaction_date",desc=False)
            .execute()
        )

        return response.data

    except Exception as e:
        raise RuntimeError(f"Get transactions from supabase failed: {e}")

# This function SELECT all AMOUNT of the transactions from supabase and calculate the income, expense and balance for user to read.
def get_transaction_summary(SUPABASE_CLIENT_ANON):
    try:
        response = (
            SUPABASE_CLIENT_ANON
            .table("transaction_history")
            .select("transaction_amount")
            .execute()
        )
        income = sum(
            t["transaction_amount"]
            for t in response.data
            if t["transaction_amount"] > 0
        )

        expense = sum(
            t["transaction_amount"]
            for t in response.data
            if t["transaction_amount"] < 0
        )

        return {
        "total_income": income,
        "total_expense": expense,
        "balance": income + expense
        }

    except Exception as e:
        return {
        "total_income": 0,
        "total_expense": 0,
        "balance": 0
        }