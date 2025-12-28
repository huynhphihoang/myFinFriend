# This function should be used to get trnsaction categories FROM SUPABASE 
# def get_transaction_categories_with_idss(SUPABASE_CLIENT) -> list[dict]:
#     response = SUPABASE_CLIENT.table("Category List") \
#         .select("category_id, category_name") \
#         .execute()

def get_transaction_categories_with_ids(SUPABASE_CLIENT) -> list:
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
        response = SUPABASE_CLIENT.table("Category List").select("category_id, category_name").execute()
        
        return response.data if response.data else []
    except Exception as e:
        print(f"Error fetching transaction categories: {e}")
        return []