# This file contains ALL functions that have READ, INSERT, UPDATE operations to the remote database SUPABASE
# This file is to be used in junction with supabase_client.py

# Imports for specifying the return types
from typing import List, Dict, Any
from flask import jsonify
import os
import requests

# Category_id mapping for UPDATE functions
CATEGORY_NAME_TO_ID = {
    "Groceries": 1,
    "Utilities": 2,
    "Cash": 3,
    "Eating out & Takeaway": 4,
    "Shopping": 5,
    "Entertainment": 6,
    "Health & Medical": 7,
    "Rent": 8,
    "Mortgage": 9,
    "Insurance": 10,
    "Travel & Holidays": 11,
    "Vehicle & Transport": 12,
    "Other": 13,
    "Fees & Interest": 14,
    "Subscriptions": 15,
    "Sport & Fitness": 16,
    "Super Contributions": 17,
    "Income": 18,
}


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
    session = SUPABASE_CLIENT_ANON.auth.get_session()
    current_uid = session.user.id
    
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
):
    try:
        # Convert the category_name back into transaction_Category_id
        transaction_category_id = CATEGORY_NAME_TO_ID[transaction["category_name"]]

        if transaction_category_id is None:
            raise ValueError("Invalid category_name provided")
        
        response = (
            SUPABASE_CLIENT_ANON
            .table("transaction_history")
            .insert({
            "transaction_date": transaction["transaction_date"],
            "transaction_details": transaction["transaction_details"],
            "transaction_amount": float(transaction["transaction_amount"]),
            "transaction_category_id": transaction_category_id,
            })
            .execute()
        )

    except Exception as e:
        raise RuntimeError(f"Insert transaction supabase failed: {e}")
    
# This function SELECT a list of transactions from supabase, with RLS: Users can read their own rows
def get_transactions_from_supabase(SUPABASE_CLIENT_ANON) ->  List[Dict[str, Any]]:
    try: 
        transactions = (
            SUPABASE_CLIENT_ANON
            .table("transaction_history")
            .select(
                "transaction_id, "
                "transaction_amount, "
                "transaction_details, "
                "transaction_date, "
                "category_list(category_name)"
            )
            .order("transaction_date",desc=False)
            .execute()
        )

        # Reformatting category_list(category_name) into category_name
        data = transactions.data

        for row in data:
            row["category_name"] = (
                row.get("category_list", {}).get("category_name")
            )
            row.pop("category_list", None)

        return data

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
        
# This function get the access token based on the email and password of the user.
def login_and_get_token(email, password):
    # Get the URL and the ANON KEY from .env file
    SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    SUPABASE_ANON_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY")
    
    # Get the link for storing the token
    url = f"{SUPABASE_URL}/auth/v1/token?grant_type=password"

    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
    }

    payload = {
        "email": email,
        "password": password,
    }

    # Get the request.
    res = requests.post(url, json=payload, headers=headers)
    res.raise_for_status()

    return res.json()["access_token"]

# This function UPDATES a CURRENT transaction inside SUPABASE and returns the UPDATED record
def update_transaction(
        SUPABASE_CLIENT_ANON,
        transaction: Dict[str, Any]
):
    # Convert the category_name back into transaction_Category_id
    transaction_category_id = CATEGORY_NAME_TO_ID[transaction["category_name"]]

    if transaction_category_id is None:
        raise ValueError("Invalid category_name provided")

    try:
        update = (
            SUPABASE_CLIENT_ANON
            .table("transaction_history")
            .update({
                "transaction_date": transaction["transaction_date"],
                "transaction_details": transaction["transaction_details"],
                "transaction_amount": float(transaction["transaction_amount"]),
                "transaction_category_id": transaction_category_id,
                })
                .eq("transaction_id", transaction["transaction_id"])
                .execute()
            )

        # Reformatting category_list(category_name) into category_name
        data = update.data
        print(update)
        for row in data:
            row["category_name"] = (
                row.get("category_list", {}).get("category_name")
            )
            row.pop("category_list", None)

        return data

    except Exception as e:
        raise RuntimeError(f"Get transactions from supabase failed: {e}")
    
# This function DELETES a transaction record from supabase "transaction_history" based on transaction_id
def delete_transaction(
        SUPABASE_CLIENT_ANON,
        transaction_id: int
):
    # Check if there is a matching record using transaction_id
    check_record = (
        SUPABASE_CLIENT_ANON
        .table("transaction_history")
        .select("transaction_id")
        .eq("transaction_id",transaction_id)
        .execute()
    )

    if not check_record.data:
        print("The record doesn't exist in the database")
        return False
    
    # Delete the desired record
    SUPABASE_CLIENT_ANON \
        .table("transaction_history") \
        .delete() \
        .eq("transaction_id", transaction_id) \
        .execute()
    
    # Verify if it's deleted
    verify = (
        SUPABASE_CLIENT_ANON
        .table("transaction_history")
        .select("transaction_id")
        .eq("transaction_id", transaction_id)
        .execute()
    )

    if not verify.data:
        print("Transaction is successfully deleted")
        return True
    else:
        raise ValueError("Delete operation failed: transaction still exists")