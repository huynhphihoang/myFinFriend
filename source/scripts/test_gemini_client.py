from db.category_extractor import get_transaction_categories_with_ids
from ai.transaction_functions import get_context_prompt
from db.supabase_client import get_supabase
from flows.pdf_parser import parse_pdf
from flows.ai_parser import parse_ai_json


from google import genai


if __name__ == "__main__":
    SUPABASE_CLIENT = get_supabase()
    # The client gets the API key from the environment variable `GEMINI_API_KEY`.
    client = genai.Client()

    #Extract pdf_text
    pdf_text = parse_pdf("/mnt/c/Users/hoang/OneDrive/Documents/Work/Qantas Lounge/Payslips/Payslip 20251111-20251124.pdf")


    contextPrompt = get_context_prompt(get_transaction_categories_with_ids(SUPABASE_CLIENT))

    #Final Prompt
    ai_prompt = f""" 
    Requirements:
    {contextPrompt}

    PDF_Text
    {pdf_text}
    """


    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=ai_prompt
    )

    print(response.text)

    json_file = parse_ai_json(response.text)

    print(json_file["transaction_amount"]-10)

    