from analytics.analytical_functions import get_expenses_by_categories, get_expenses_by_frequency, get_income_by_frequency, get_total_expense_by_date_range,get_total_income_by_date_range
from db.supabase_client import get_supabase_anon
from db.supabase_functions import get_transactions_from_supabase
from db.supabase_functions import login_and_get_token

import pandas as pd
from io import StringIO
from datetime import datetime

if __name__ == "__main__":
    # Get the token from the example user.
    TOKEN = login_and_get_token(
        email="11a4huynhphihoang06@gmail.com",
        password="12345678910"
    )
    
    # Get the client supabase 
    SUPABASE_CLIENT_ANON = get_supabase_anon(TOKEN)

    # Get all information from transaction history
    data = get_transactions_from_supabase(SUPABASE_CLIENT_ANON)

    # Run get_Expenses_by_categories
    expenses_by_categories = get_expenses_by_categories(data)

    # Run get_expenses_by_frequency
    monthly_expenses = get_expenses_by_frequency('Monthly',data,datetime(2025, 1, 1),datetime(2025,12,30))

    # Run get_expenses_by_frequency with quarterly period
    quarterly_expenses = get_expenses_by_frequency('Quarterly',data,datetime(2025, 1, 1),datetime(2025,12,30))

    # Run get_income_by_frequency with monthly period
    monthly_income = get_income_by_frequency('Monthly',data,datetime(2025,1,30),None)

    # Run get_total_expense_by_date_range
    total_expense_from_20250102_to_20250228 = get_total_expense_by_date_range(data,datetime(2025,1,2),datetime(2025,2,28)) # Expects -25

    # Run get_total_income_by_date_range
    total_income_from_20250102_to_20250228 = get_total_income_by_date_range(data,datetime(2025,1,2),datetime(2025,2,28)) # Expects 522.5
    
    # Output result to terminal
    result = total_income_from_20250102_to_20250228
    print(result)
