from analytics.analytical_functions import get_expenses_by_categories, get_expenses_by_frequency, get_income_by_frequency
import pandas as pd
from io import StringIO

if __name__ == "__main__":
    # CSV Data
    csv_data = """
    transaction_id,transaction_amount,transaction_details,transaction_date,user_id,category_name
    1,120,Groceries,2025-09-23,4ee52904-08e6-44ae-b06f-ee756de93158,Groceries
    2,-10,tickets,2025-09-24,4ee52904-08e6-44ae-b06f-ee756de93158,Entertainment
    3,-15,boba,2025-09-24,4ee52904-08e6-44ae-b06f-ee756de93158,Rent
    10,402.5,Salary Payment,2025-12-15,4ee52904-08e6-44ae-b06f-ee756de93158,Income
    11,402.5,Salary Payment,2025-12-15,4ee52904-08e6-44ae-b06f-ee756de93158,Income
    12,402.5,Salary Payment Me2U Viet Eatery,2025-12-15,4ee52904-08e6-44ae-b06f-ee756de93158,Income
"""
    # Parse CSV → DataFrame
    df = pd.read_csv(StringIO(csv_data.strip()))

    # DataFrame → List[Dict] (Supabase-style payload)
    data = df.to_dict(orient="records")

    # Run analytical function
    result = get_expenses_by_categories(data)

    # Output result to terminal
    print(result)
