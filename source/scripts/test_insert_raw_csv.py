from db.supabase_functions import insert_transaction_supabase
from db.supabase_client import get_supabase_anon
from db.supabase_functions import login_and_get_token
from pathlib import Path

if __name__ == "__main__":
    # get the token from the example user.
    TOKEN = login_and_get_token(
        email="11a4huynhphihoang06@gmail.com",
        password="12345678910"
    )
    
    # Get the client supabase 
    SUPABASE_CLIENT_ANON = get_supabase_anon(TOKEN)

    # Use AI to change the raw transaction in this snippet, do not insert the same data twice
    transactions = [
        {
            "transaction_amount": 120,
            "transaction_details": "Groceries",
            "transaction_date": "2025-01-08",
            "transaction_category_id": 1
        },
        {
            "transaction_amount": -10,
            "transaction_details": "tickets",
            "transaction_date": "2025-01-22",
            "transaction_category_id": 6
        },
        {
            "transaction_amount": -15,
            "transaction_details": "boba",
            "transaction_date": "2025-02-05",
            "transaction_category_id": 8
        },
        {
            "transaction_amount": 402.5,
            "transaction_details": "Salary Payment",
            "transaction_date": "2025-02-28",
            "transaction_category_id": 18
        },
        {
            "transaction_amount": 402.5,
            "transaction_details": "Salary Payment",
            "transaction_date": "2025-03-15",
            "transaction_category_id": 18
        },
        {
            "transaction_amount": 402.5,
            "transaction_details": "Salary Payment Me2U Viet Eatery",
            "transaction_date": "2025-03-29",
            "transaction_category_id": 18
        },
        {
            "transaction_amount": -45.6,
            "transaction_details": "Woolworths Grocery",
            "transaction_date": "2025-04-10",
            "transaction_category_id": 1
        },
        {
            "transaction_amount": -18.9,
            "transaction_details": "Coffee Club Breakfast",
            "transaction_date": "2025-04-24",
            "transaction_category_id": 4
        },
        {
            "transaction_amount": -120,
            "transaction_details": "Rent Payment",
            "transaction_date": "2025-05-06",
            "transaction_category_id": 8
        },
        {
            "transaction_amount": -7.5,
            "transaction_details": "Bus Ticket",
            "transaction_date": "2025-05-21",
            "transaction_category_id": 12
        },
        {
            "transaction_amount": -62.3,
            "transaction_details": "Electricity Bill",
            "transaction_date": "2025-06-14",
            "transaction_category_id": 2
        },
        {
            "transaction_amount": -25,
            "transaction_details": "Phone Recharge",
            "transaction_date": "2025-07-03",
            "transaction_category_id": 2
        },
        {
            "transaction_amount": 150,
            "transaction_details": "Freelance Payment",
            "transaction_date": "2025-08-09",
            "transaction_category_id": 18
        },
        {
            "transaction_amount": -33.8,
            "transaction_details": "Uber Eats Dinner",
            "transaction_date": "2025-09-17",
            "transaction_category_id": 6
        },
        {
            "transaction_amount": -12.4,
            "transaction_details": "Bubble Tea",
            "transaction_date": "2025-10-11",
            "transaction_category_id": 4
        },
        {
            "transaction_amount": -89.99,
            "transaction_details": "Clothing Purchase",
            "transaction_date": "2025-11-26",
            "transaction_category_id": 5
        },
    ]

    # Insert into supabase
    for tx in transactions:
        insert_transaction_supabase(SUPABASE_CLIENT_ANON, tx)
    

