from db.supabase_functions import get_transaction_categories_with_ids
from ai.ai_functions import get_context_prompt
from db.supabase_client import get_supabase_service, get_supabase_anon
from flows.pdf_parser import parse_pdf
from flows.ai_parser import parse_ai_json


from google import genai


if __name__ == "__main__":
    SUPABASE_CLIENT_SERVICE = get_supabase_service()
    # The client gets the API key from the environment variable `GEMINI_API_KEY`.
    GEMINI_CLIENT = genai.Client()

    #Extract pdf_text
    pdf_text = parse_pdf("/mnt/c/Users/hoang/OneDrive/Documents/Work/Qantas Lounge/Payslips/Payslip 20251111-20251124.pdf")


    contextPrompt = get_context_prompt(get_transaction_categories_with_ids(SUPABASE_CLIENT_SERVICE))

    #Final Prompt
    ai_prompt = f""" 
        Requirements:
        {contextPrompt}

        PDF_Text
        {pdf_text}
    """
    response = GEMINI_CLIENT.models.generate_content(
        model="gemini-2.5-flash", contents=ai_prompt
    )

    print(response.text)
    