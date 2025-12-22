"""
Category Extractor Module

Extracts transaction categories from Supabase transaction_categories table.
"""
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Supabase client
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY")


def get_supabase_client() -> Client:
    """Create and return a Supabase client instance."""
    if not SUPABASE_URL or not SUPABASE_ANON_KEY:
        raise ValueError(
            "SUPABASE_URL and SUPABASE_KEY must be set in environment variables"
        )
    return create_client(SUPABASE_URL, SUPABASE_ANON_KEY)


def get_transaction_categories() -> list:
    """
    Fetch transaction categories from Supabase transaction_categories table.
    
    Schema:
        - category_id: int2
        - category_name: VARCHAR
    
    Returns:
        list: List of category names as strings
    """
    try:
        supabase = get_supabase_client()
        
        # Fetch all categories from the transaction_categories table
        response = supabase.table("transaction_categories").select("category_name").execute()
        
        # Extract category names
        categories = []
        if response.data:
            for row in response.data:
                category_name = row.get("category_name")
                if category_name:
                    categories.append(category_name)
        
        return categories
    except Exception as e:
        print(f"Error fetching transaction categories: {e}")
        # Return empty list on error
        return []


def get_transaction_categories_with_ids() -> list:
    """
    Fetch transaction categories with their IDs from Supabase transaction_categories table.
    
    Schema:
        - category_id: int2
        - category_name: VARCHAR
    
    Returns:
        list: List of dictionaries with category_id and category_name
    """
    try:
        supabase = get_supabase_client()
        
        # Fetch all categories with IDs
        response = supabase.table("transaction_categories").select("category_id, category_name").execute()
        
        return response.data if response.data else []
    except Exception as e:
        print(f"Error fetching transaction categories: {e}")
        return []

