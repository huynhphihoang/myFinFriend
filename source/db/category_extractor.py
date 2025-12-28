# This function should be used to get trnsaction categories FROM SUPABASE 
def get_transaction_categories_with_ids(SUPABASE_CLIENT) -> list[dict]:
    response = SUPABASE_CLIENT.table("Category List") \
        .select("category_id, category_name") \
        .execute()

    return response.data or []