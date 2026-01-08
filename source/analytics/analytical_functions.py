import pandas as pd
from typing import List, Dict, Any
from datetime import datetime

# Define time length
PERIOD_LENGTH = {
    "Weekly": pd.Timedelta(days=7),
    "Monthly":pd.DateOffset(months=1),
    "Quarterly":pd.DateOffset(months=3),
    "Annually":pd.DateOffset(years=1),
}
FREQUENCY_MAP ={
    "Weekly" : "W",
    "Monthly":"M",
    "Quarterly":"Q",
    "Annually": "Y"
}

# Helper function for rolling window time length validator
def _time_period_validator_(
    start_date: datetime, 
    end_date: datetime,
    frequency: str
):
    start = pd.Timestamp(start_date)
    end = pd.Timestamp(end_date)

    if frequency not in PERIOD_LENGTH:
        raise ValueError("Invalid Frequency")
    
    # Assess if start and end dates satisfy the frequency length
    min_length = PERIOD_LENGTH[frequency]

    if isinstance(min_length, pd.Timedelta):
        if end - start < min_length:
            raise ValueError("Date range too short for selected frequency")
    else:
        if start + min_length > end:
            raise ValueError("Date range too short for selected frequency")
    
def get_expenses_by_frequency(
    frequency: str, # Weekly, Monthly, Quarterly, Annually
    data: List[Dict],
    start_date: datetime,
    end_date: datetime
) -> List[Dict]:
    # Turn data into a pandas DataFrame
    df = pd.DataFrame(data)

    # Convert into datetime format
    df["transaction_date"] = pd.to_datetime(df["transaction_date"])

    # Validate if chosen period satisfies at least 1 unit of freqeuncy period desired
    _time_period_validator_(start_date,end_date,frequency)

    # Filters to show only negative transaction amounts in between the chosen period
    df = df[
        (df["transaction_amount"] < 0) &
        (df["transaction_date"].between(start_date,end_date))
    ]

    # Group the transactions by the desired frequency
    df["period"] = df["transaction_date"].dt.to_period(FREQUENCY_MAP[frequency])

    result = (
        df.groupby("period", as_index=False)["transaction_amount"]
        .sum()
        .sort_values("period")
    )

    result["period"] = result["period"].astype(str)

    return result.to_dict(orient="records")

def get_income_by_frequency(    
    frequency: str, # Weekly, Monthly, Quarterly
    data: List[Dict],
    start_date: datetime,
    end_date: datetime
) -> List[Dict]:
    # Turn data into a pandas DataFrame
    df = pd.DataFrame(data)

    # Convert into datetime format
    df["transaction_date"] = pd.to_datetime(df["transaction_date"])

    # Validate if chosen period satisfies at least 1 unit of freqeuncy period desired
    _time_period_validator_(start_date,end_date,frequency)

    # Filters to show only negative transaction amounts in between the chosen period
    df = df[
        (df["transaction_amount"] > 0) &
        (df["transaction_date"].between(start_date,end_date))
    ]

    # Group the transactions by the desired frequency
    df["period"] = df["transaction_date"].dt.to_period(FREQUENCY_MAP[frequency])

    result = (
        df.groupby("period", as_index=False)["transaction_amount"]
        .sum()
        .sort_values("period")
    )

    result["period"] = result["period"].astype(str)

    return result.to_dict(orient="records")

# This function GROUPS expenses by their categories, input is data queried from supabase using get_transactions function
def get_expenses_by_categories(
    data: List[Dict],
) -> List[Dict]:
    # Turn data into a pandas DataFrame
    df = pd.DataFrame(data)
    
    # Filters to show only negative transaction amounts
    df = df[df["transaction_amount"] < 0]

    result = (
        df
        .groupby("category_name", as_index=False)
        .agg(total_expense=("transaction_amount","sum"))
        .sort_values("total_expense")
    )

    return result.to_dict(orient="records")