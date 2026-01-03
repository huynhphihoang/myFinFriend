# Reusable supabase client with library imports and environment variables loading
# ONLY USE THIS CLIENT INSTANCE FOR SERVER SIDE TASKS

from supabase import create_client, Client, ClientOptions
from dotenv import load_dotenv
import os

# Load environment variables from .env file first
load_dotenv()

# Reset client
SUPABASE_CLIENT_SERVICE: Client | None = None
SUPABASE_CLIENT_ANON: Client | None = None

def get_supabase_service() -> Client:
    # Create a global supabase client that entails service role for backend functions
    global SUPABASE_CLIENT_SERVICE

    # Initialize Supabase client
    if SUPABASE_CLIENT_SERVICE is None:
        # Get Supabase credentials from environment
        SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
        SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    # Error catching
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        raise ValueError(
            "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment variables"
        )
    
    # Create new client instance -> call this in other file
    SUPABASE_CLIENT_SERVICE = create_client(SUPABASE_URL,SUPABASE_SERVICE_ROLE_KEY)

    return SUPABASE_CLIENT_SERVICE

def get_supabase_anon(token) -> Client:
    """ 
    parameter: 
        - token is an access token from the frontend to allow the user connect their database to get the necessary info 
    return:
        - the supabase storage of the user
    """
    # Create a global supabase client that entails service role for backend functions
    global SUPABASE_CLIENT_ANON

    # Initialize Supabase client
    if SUPABASE_CLIENT_ANON is None:
        # Get Supabase credentials from environment
        SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
        SUPABASE_ANON_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY")

        # Error catching
        if not SUPABASE_URL or not SUPABASE_ANON_KEY :
            raise ValueError(
                "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment variables"
            )
        
        options = ClientOptions(
        headers={
            "Authorization": f"Bearer {token}"
        },
        auto_refresh_token=False,
        persist_session=False,
        storage=None, 
    )

        # Create new client instance -> call this in other file
        SUPABASE_CLIENT_ANON = create_client(SUPABASE_URL,SUPABASE_ANON_KEY, options)

    return SUPABASE_CLIENT_ANON

