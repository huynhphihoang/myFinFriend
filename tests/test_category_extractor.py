import sys
from pathlib import Path

# Add source directory to path
sys.path.insert(0, str(Path(__file__).parent.parent / "source"))

from db.category_extractor.py import get_category
from db.supabase_client import get_supabase


def test_get_transaction_categories_with_ids():
    """Test that get_transaction_categories_with_ids returns data from supabase"""
    # Set up supabase client
    ce_module = get_supabase()
    
    # Call the function
    result = supabase_object.get_transaction_categories_with_ids()
    
    # Assert it returns data
    assert result is not None
    assert isinstance(result, list)


if __name__ == "__main__":
    test_get_transaction_categories_with_ids()
    print("Test passed!")
