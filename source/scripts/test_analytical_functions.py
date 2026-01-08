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
    13,-45.6,Woolworths Grocery,2025-12-16,4ee52904-08e6-44ae-b06f-ee756de93158,Groceries
    14,-18.9,Coffee Club Breakfast,2025-12-16,4ee52904-08e6-44ae-b06f-ee756de93158,Eating Out
    15,-120,Rent Payment,2025-12-17,4ee52904-08e6-44ae-b06f-ee756de93158,Rent
    16,-7.5,Bus Ticket,2025-12-17,4ee52904-08e6-44ae-b06f-ee756de93158,Transport
    17,-62.3,Electricity Bill,2025-12-18,4ee52904-08e6-44ae-b06f-ee756de93158,Utilities
    18,-25,Phone Recharge,2025-12-18,4ee52904-08e6-44ae-b06f-ee756de93158,Utilities
    19,150,Freelance Payment,2025-12-19,4ee52904-08e6-44ae-b06f-ee756de93158,Income
    20,-33.8,Uber Eats Dinner,2025-12-19,4ee52904-08e6-44ae-b06f-ee756de93158,Entertainment
    21,-12.4,Bubble Tea,2025-12-20,4ee52904-08e6-44ae-b06f-ee756de93158,Eating Out
    22,-89.99,Clothing Purchase,2025-12-20,4ee52904-08e6-44ae-b06f-ee756de93158,Shopping
"""
    # Parse CSV → DataFrame
    df = pd.read_csv(StringIO(csv_data.strip()))

    # DataFrame → List[Dict] (Supabase-style payload)
    data = df.to_dict(orient="records")

    # Run analytical function
    expenses_by_categories = get_expenses_by_categories(data)

    # Output result to terminal
    print(result)
