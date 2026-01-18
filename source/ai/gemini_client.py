from google import genai
import os
import sys
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)
from db.supabase_functions import get_transaction_categories_with_ids

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

model = "gemini-3-flash-preview"

def extract_transactions(pdf_text, SUPABASE_CLIENT_ANON, categories=None):
    """
    Extract transaction details from PDF text using Gemini AI.
    
    Arguments:
        pdf_text (str): The extracted text from the PDF
        categories (list, optional): List of transaction categories. 
                                   If None, fetches from Supabase automatically.
    
    Returns:
        str: JSON string with extracted transaction details
    """
    
    #Fetch categories from Supabase if not provided
    if categories is None:
        categories = get_transaction_categories_with_ids(SUPABASE_CLIENT_ANON)
    
    #Format categories for the prompt
    categories_text = ""
    if categories:
        category_names = [c["category_name"] for c in categories]
        categories_list = ", ".join(category_names)
        categories_text = f"""
    Available transaction categories: {categories_list}
    
    You MUST use one of these categories when categorizing transactions. If the transaction doesn't match any of these categories, return "Unknown".
    """
    else:
        categories_text = """
    If you cannot determine the category, return "Unknown".
    """
    
    prompt = f"""
    You are a financial assistant for a personal financial management web-app.

    You need to extract transaction details from the input text.

    You CANNOT store any personal information in your response including but not limited: names, addresses, phone numbers, emails and employee ID.
    
    All data types are to be returned in the context of the user residing in Australia, using Australian Dollars (AUD)
    {categories_text}
    Return transaction_type as 1 for expenses and 2 for income, otherwise 0 for undefined
    Return transaction_category_id following the categories list

    You MUST read and return the transaction details in a JSON format following the schema:
    
    {{
        "transaction_date": "YYYY-MM-DD",
        "transaction_details": "Rent Receipt",
        "transaction_amount": -120,
        "category_name": "Rent",
        "transaction_category_id": 8,
        "transaction_type": 1,
        "relevant": true
    }}

    If the input text doesn't contain at least date and amount, return a JSON file following this format:
    {{
        "transaction_date": "NULL",
        "transaction_details": "NULL",
        "transaction_amount": 0,
        "category_name": "NULL",
        "transaction_category_id": 0,
        "transaction_type": 0,
        "relevant": false
    }}

    """
    response = client.models.generate_content(
        model=model,
        contents=f"{prompt}\n\n{pdf_text}"
    )
    return response.text