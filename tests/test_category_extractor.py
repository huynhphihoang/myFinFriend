import sys
from pathlib import Path

# Add source directory to path
sys.path.insert(0, str(Path(__file__).parent.parent / "source"))

from db.category_extractor import get_transaction_categories_with_ids
from db.supabase_client import get_supabase

if __name__ == "__main__":
    SUPABASE_CLIENT = get_supabase()
    results = get_transaction_categories_with_ids(SUPABASE_CLIENT)
    print(f"The categories are: {results}")
    print("Test passed!")
