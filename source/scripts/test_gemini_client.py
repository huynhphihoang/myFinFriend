from source.db.category_extractor import get_transaction_categories_with_ids
from source.db.supabase_client import get_supabase
from source.ai.gemini_client import get_gemini

if __name__ == "__main__":
    #SUPABASE_CLIENT = get_supabase()
    #results = get_transaction_categories_with_ids(SUPABASE_CLIENT)

    #Simple gen-ai prompt 
    GEMINI_CLIENT, GEN_AI_MODEL = get_gemini()

    prompt = f""" Hi, how much is 100 + 50 """
    response =  GEMINI_CLIENT.generate_content(
        model = GEN_AI_MODEL,
        prompt = prompt,
    )

    print(f"{response.text}")