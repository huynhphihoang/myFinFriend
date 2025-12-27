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

