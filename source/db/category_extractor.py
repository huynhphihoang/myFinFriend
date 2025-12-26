def get_transaction_categories_with_ids() -> list[dict]:
    response = supabase.table("Category List") \
        .select("category_id, category_name") \
        .execute()

    return response.data or []

