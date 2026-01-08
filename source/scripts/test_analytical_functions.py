from analytics.analytical_functions import get_expenses_by_categories, get_expenses_by_frequency, get_income_by_frequency
import pandas as pd
from io import StringIO
from datetime import datetime

if __name__ == "__main__":
    # CSV Data
    csv_data = """
    transaction_id,transaction_amount,transaction_details,transaction_date,user_id,category_name
    1,120,Groceries,2025-01-08,4ee52904-08e6-44ae-b06f-ee756de93158,Groceries
    2,-10,tickets,2025-01-22,4ee52904-08e6-44ae-b06f-ee756de93158,Entertainment
    3,-15,boba,2025-02-05,4ee52904-08e6-44ae-b06f-ee756de93158,Rent
    10,402.5,Salary Payment,2025-02-28,4ee52904-08e6-44ae-b06f-ee756de93158,Income
    11,402.5,Salary Payment,2025-03-15,4ee52904-08e6-44ae-b06f-ee756de93158,Income
    12,402.5,Salary Payment Me2U Viet Eatery,2025-03-29,4ee52904-08e6-44ae-b06f-ee756de93158,Income
    13,-45.6,Woolworths Grocery,2025-04-10,4ee52904-08e6-44ae-b06f-ee756de93158,Groceries
    14,-18.9,Coffee Club Breakfast,2025-04-24,4ee52904-08e6-44ae-b06f-ee756de93158,Eating Out
    15,-120,Rent Payment,2025-05-06,4ee52904-08e6-44ae-b06f-ee756de93158,Rent
    16,-7.5,Bus Ticket,2025-05-21,4ee52904-08e6-44ae-b06f-ee756de93158,Transport
    17,-62.3,Electricity Bill,2025-06-14,4ee52904-08e6-44ae-b06f-ee756de93158,Utilities
    18,-25,Phone Recharge,2025-07-03,4ee52904-08e6-44ae-b06f-ee756de93158,Utilities
    19,150,Freelance Payment,2025-08-09,4ee52904-08e6-44ae-b06f-ee756de93158,Income
    20,-33.8,Uber Eats Dinner,2025-09-17,4ee52904-08e6-44ae-b06f-ee756de93158,Entertainment
    21,-12.4,Bubble Tea,2025-10-11,4ee52904-08e6-44ae-b06f-ee756de93158,Eating Out
    22,-89.99,Clothing Purchase,2025-11-26,4ee52904-08e6-44ae-b06f-ee756de93158,Shopping
"""
    # Parse CSV → DataFrame
    df = pd.read_csv(StringIO(csv_data.strip()))

    # DataFrame → List[Dict] (Supabase-style payload)
    data = df.to_dict(orient="records")

    # Run get_Expenses_by_categories
    expenses_by_categories = get_expenses_by_categories(data)

    # Run get_expenses_by_frequency
    monthly_expenses = get_expenses_by_frequency('Monthly',data,datetime(2025, 1, 1),datetime(2025,12,30))

    # Run get_expenses_by_frequency with quarterly period
    quarterly_expenses = get_expenses_by_frequency('Quarterly',data,datetime(2025, 1, 1),datetime(2025,12,30))

    # Run get_income_by_frequency with monthly period
    monthly_income = get_income_by_frequency('Monthly',data,datetime(2025, 1, 1),datetime(2025,12,30))
    
    # Output result to terminal
    result = monthly_income
    print(result)
