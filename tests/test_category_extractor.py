from db.category_extractor import get_transaction_categories_with_ids


if __name__ == "__main__":
    print("\nTesting extracting categories with IDs from Supabase")
    categories_ids = get_transaction_categories_with_ids()
    print(f"Categories: {categories_ids}")

