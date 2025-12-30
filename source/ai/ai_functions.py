# This file contains all functions that is related to AI

# Prompt template for LLM 
def get_context_prompt(categories: list[dict]) -> str:
    # Context prompt for AI model

    # Getting remote categories from supabase table
    # Format categories for the prompt
    # Extract category names safely
    category_names = [
        c.get("category_name")
        for c in categories
        if isinstance(c, dict) and c.get("category_name")
    ]

    if category_names:
        categories_list = ", ".join(category_names)
        categories_text = f"""
        Available transaction categories: {categories_list}
        You MUST use one of these categories when categorizing transactions. If the transaction doesn't match any of these categories, return "Unknown".
        """
    else:
        categories_text = """If you cannot determine the category, return "Unknown"."""
    
    prompt = f"""
    You are a financial assistant for a personal financial management web-app.

    You need to extract transaction details from the input text.

    You CANNOT store identifiable, and sensitive information into your memory and response including but not limited to:
        - Full names
        - Dates of birth
        - Employment status
        - Company names
        - Personal or company addresses
        - Phone numbers
        - Payroll or employee numbers

    
    All data types are to be returned in the context of the user residing in Australia, using Australian Dollars (AUD)

    {categories_text}

    Return a JSON object with the following fields and STRICT data types:
        - transaction_date: string
        Format: "YYYY-MM-DD" (ISO 8601 date). Do NOT include time.

        - transaction_details: string
        A short human-readable description of the transaction.

        - transaction_amount: number
        A signed decimal number.
        Expenses must be negative.
        Income must be positive.
        Do NOT include currency symbols.

        - transaction_category: string
        Must be exactly one of the provided categories, or "Unknown".

        - transaction_type: integer
        Allowed values:
            1 = expense
            2 = income
            0 = undefined

        - relevant: boolean
        true if the transaction is valid, otherwise false.

        Return transaction_type as:
        - 1 for expenses
        - 2 for income
        - 0 for undefined

    
    {{
        "transaction_date": "YYYY-MM-DD",
        "transaction_details": "Rent Receipt",
        "transaction_amount": -120,
        "transaction_category": "Rent",
        "transaction_type": 1,
        "relevant": true
    }}

    If the input text doesn't contain at least date and amount, return this JSON instead:
    {{
        "transaction_date": "NULL",
        "transaction_details": "NULL",
        "transaction_amount":  NULL,
        "transaction_category": "NULL",
        "transaction_type": 0,
        "relevant": false
    }}

    """
    return prompt