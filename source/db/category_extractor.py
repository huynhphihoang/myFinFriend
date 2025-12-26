"""
Category Extractor Module

Extracts transaction categories from Supabase transaction_categories table.
"""
from supabase_client import supabase


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
        # Fetch all categories from the transaction_categories table
        response = supabase.table("Category List").select("category_name").execute()
        
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
        # Fetch all categories with IDs
        response = supabase.table("Category List").select("category_id, category_name").execute()
        
        return response.data if response.data else []
    except Exception as e:
        print(f"Error fetching transaction categories: {e}")
        return []

#Test the functions
if __name__ == "__main__":
    print("\nTesting get_transaction_categories_with_ids()...")
    categories_with_ids = get_transaction_categories_with_ids()
    print(f"Categories with IDs: {categories_with_ids}")

