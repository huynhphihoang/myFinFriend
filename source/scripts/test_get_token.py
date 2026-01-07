### File for testing if we can get the token from the supabase.

# Necessary imports
from dotenv import load_dotenv
from db.supabase_functions import login_and_get_token

# Load environment variables from .env file first
load_dotenv()

if __name__ == "__main__":
    
    # TEST USER and print it.
    TOKEN = login_and_get_token(
        email="11a4huynhphihoang06@gmail.com",
        password="12345678910"
    )
    
    print(TOKEN)

