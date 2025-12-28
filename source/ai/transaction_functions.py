#This file contains all functions that is related to transactions
from source.ai.gemini_config import get_gemini
from source.ai.prompts import get_transaction_extraction_prompt

# Prompt template for LLM injection
def get_transaction_extraction_prompt(categories):
    # Getting remote categories from supabase table
    # Format categories for the prompt
    if categories:
        categories_list = ", ".join(categories)
        categories_text = f"""Available transaction categories: {categories_list}
        You MUST use one of these categories when categorizing transactions. If the transaction doesn't match any of these categories, return "Unknown".
        """
    else:
        categories_text = """If you cannot determine the category, return "Unknown"."""
    
    prompt = f"""
    You are a financial assistant for a personal financial management web-app.

    You need to extract transaction details from the input text.

    You CANNOT store identifiable, and sensitive information into your memory and response including:
        Full Names, Date of Birth, Employment Status, Company's Name, Personal Address, Personal Phone Number, Company's Address
        Payroll number, employee's number
    
    All data types are to be returned in the context of the user residing in Australia, using Australian Dollars (AUD)
    {categories_text}
    Return transaction_type as 1 for expenses and 2 for income, otherwise 0 for undefined

    You MUST read and return the transaction details in a JSON format following the schema:
    
    {{
        "transaction_date": "YYYY-MM-DD",
        "transaction_details": "Rent Receipt",
        "transaction_amount": " -$120",
        "transaction_category": "Rent",
        "transaction_type": 1,
        "relevant": true
    }}

    If the input text doesn't contain at least date and amount, return a JSON file following this format:
    {{
        "transaction_date": "NULL",
        "transaction_details": "NULL",
        "transaction_amount": " NULL",
        "transaction_category": "NULL",
        "transaction_type": 0,
        "relevant": false
    }}

    """
    return prompt

#
def extract_transactions_details(pdf_text, categories=None):
    """
    Extract transaction details from PDF text using Gemini AI.
    
    Arguments:
        pdf_text (str): The extracted text from the PDF
        categories (list, optional): List of transaction categories fetches from Supabase
    
    Returns:
        str: JSON string with extracted transaction details
    """
    # Get configured Gemini client and model
    genai, model = get_gemini()
    
    #Fetch categories from Supabase if not provided
    if categories is None:
        from source.db.category_extractor import get_transaction_categories_with_ids
        from source.db.supabase_client import get_supabase
        SUPABASE_CLIENT = get_supabase()
        categories_with_ids = get_transaction_categories_with_ids(SUPABASE_CLIENT)
        # Extract just the category names (list of strings)
        categories = [cat.get('category_name') for cat in categories_with_ids if cat.get('category_name')] if categories_with_ids else []
    
    #Get the prompt from the prompts module
    prompt = get_transaction_extraction_prompt(categories)
    response = genai.generate_content(
        model=model,
        prompt=prompt,
        contents=pdf_text
    )
    return response.text
