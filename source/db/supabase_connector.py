from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv() 

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

def main():
    response = (
        supabase
        .table("Category List")
        .select("*")
        .execute()
    )
    
    print(response.data)

if __name__ == "__main__":
    main()
