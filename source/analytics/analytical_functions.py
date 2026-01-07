import pandas as pd
from typing import List, Dict, Any

# This function is used to SELECT and store user's personal transactions from supabase
def get_expenses_by_frequency(
    frequency: str, # Weekly, Monthly, Quarterly
    data: List[Dict]
) -> List[Dict]:
    # Turn data into a pandas DataFrame
    df = pd.DataFrame(data)

    # Filters to show only negative transaction amounts
    df = df[df["transaction_amount"] < 0]

    # List the frequency map
    frequency_map = {
        "Weekly" : "W",
        "Monthly":"M",
        "Quarterly":"Q"
    }

    if frequency not in frequency_map:
        raise ValueError("frequency must be 'weekly', 'monthly', or 'quarterly'")
    
    # Group the transactions by the desired frequency
    df["period"] = df["transaction_date"].dt.to_period(frequency_map[frequency])

    result = df.groupby("period", as_index=False)["transaction_amount"].sum().sort_values("period")

    result["period"] = result["period"].astype(str)

    # Drop the transaction_date columns for aggregated data
    result = result.drop(columns=["transaction_date"])

    return result.to_dict(orient="records")

def get_income_by_frequency(    
    frequency: str, # Weekly, Monthly, Quarterly
    data: List[Dict]
) -> List[Dict]:
    # Turn data into a pandas DataFrame
    df = pd.DataFrame(data)

    # Filters to show only positive transaction amounts
    df = df[df["transaction_amount"] > 0]

    # List the frequency map
    frequency_map = {
        "Weekly" : "W",
        "Monthly":"M",
        "Quarterly":"Q"
    }

    if frequency not in frequency_map:
        raise ValueError("frequency must be 'weekly', 'monthly', or 'quarterly'")

    result = df.groupby("period", as_index=False)["transaction_amount"].sum().sort_values("period")

    result["period"] = result["period"].astype(str)

    # Drop the transaction_date columns for aggregated data
    result = result.drop(columns=["transaction_date"])

    return result.to_dict(orient="records")

def get_expenses_by_categories(
    data: List[Dict],
    categories_with_ids: List[Dict]
) -> List[Dict]:
    # Turn data into a pandas DataFrame
    df = pd.DataFrame(data)
    cat_ids = pd.DataFrame(categories_with_ids)

    # Filters to show only negative transaction amounts
    df = df[df["transaction_amount"] < 0]

    # Left join cat_ids with df
    result = df.merge(cat_ids, on="category_id",how = "left")

    result = (
        result
        .groupby("category_name", as_index=False)
        .agg(total_expense=("transaction_amount","sum"))
        .sort_values("total_expense")
    )

    return result.to_dict(orient="records")