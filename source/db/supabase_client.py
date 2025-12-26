# Reusable supabase client with library imports and environment variables loading
# ONLY USE THIS CLIENT INSTANCE FOR SERVER SIDE TASKS

from supabase import create_client, Client
from dotenv import load_dotenv
import os

# Load environment variables from .env file first
load_dotenv()

# Reset client
SUPABASE_CLIENT: Client | None = None

def get_supabase() -> Client:
    # Create a global supabase client that entails service role for backend functions
    global SUPABASE_CLIENT

    # Initialize Supabase client
    if SUPABASE_CLIENT is None:
        # Get Supabase credentials from environment
        SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
        SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    # Error catching
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        raise ValueError(
            "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment variables"
        )
    
    # Create new client instance -> call this in other file
    SUPABASE_CLIENT = create_client(SUPABASE_URL,SUPABASE_SERVICE_ROLE_KEY)

    return SUPABASE_CLIENT
