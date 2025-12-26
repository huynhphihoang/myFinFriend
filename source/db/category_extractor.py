def get_transaction_categories_with_ids() -> list[dict]:
    response = supabase.table("Category List") \
        .select("category_id, category_name") \
        .execute()

    return response.data or []

#Test the functions
if __name__ == "__main__":
    print("\nTesting get_transaction_categories_with_ids()...")
    categories_with_ids = get_transaction_categories_with_ids()
    print(f"Categories with IDs: {categories_with_ids}")

