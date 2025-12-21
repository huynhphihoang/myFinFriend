import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = "gemini-3-flash-preview"

def extract_transactions(pdf_text):
    prompt = f"""
    You need to extract transaction details from the input text.
    You CANNOT store any personal information in your response including but not limited: names, addresses, phone numbers, emails and employee ID.
    You MUST read and return the transaction details in a JSON format following the schema:
    {json_schema:
    [
        {
            "date": "",
            "description": "",
            "amount": 
        }
    ]
    }
    """
    response = genai.generate_content(
        model=model,
        prompt=prompt,
        contents=pdf_text
    )
    return response.text