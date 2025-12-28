from db.category_extractor import get_transaction_categories_with_ids
from db.supabase_client import get_supabase
from ai.gemini_client import get_gemini
from google import genai


if __name__ == "__main__":
    #SUPABASE_CLIENT = get_supabase()
    #results = get_transaction_categories_with_ids(SUPABASE_CLIENT)

    #Simple gen-ai prompt 
    #GEMINI_CLIENT = get_gemini()


    # The client gets the API key from the environment variable `GEMINI_API_KEY`.
    client = genai.Client()

    response = client.models.generate_content(
        model="gemini-2.5-flash", contents="1+1"
    )
    print(response.text)