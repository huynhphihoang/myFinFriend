import google.generativeai as genai
import os
from source.category_extractor import get_transaction_categories
from source.ai.prompts import get_transaction_extraction_prompt

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = "gemini-3-flash-preview"

def extract_transactions(pdf_text, categories=None):
    """
    Extract transaction details from PDF text using Gemini AI.
    
    Arguments:
        pdf_text (str): The extracted text from the PDF
        categories (list, optional): List of transaction categories fetches from Supabase
    
    Returns:
        str: JSON string with extracted transaction details
    """
    #Fetch categories from Supabase if not provided
    if categories is None:
        categories = get_transaction_categories()
    
    # Get the prompt from the prompts module
    prompt = get_transaction_extraction_prompt(categories)
    response = genai.generate_content(
        model=model,
        prompt=prompt,
        contents=pdf_text
    )
    return response.text


