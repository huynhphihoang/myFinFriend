# Reusable Gemini client configuration with library imports and environment variables loading
# ONLY USE THIS CLIENT INSTANCE FOR SERVER SIDE TASKS

import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables from .env file first
load_dotenv()

# Track if Gemini is configured
GEMINI_CONFIGURED: bool = False
GEMINI_MODEL: str = "gemini-3-flash-preview"

def get_gemini():
    """
    Initialize and return the configured Gemini genai module and model name.
    This function ensures Gemini is configured only once (singleton pattern).
    
    Returns:
        tuple: (genai module, model_name string)
    """
    global GEMINI_CONFIGURED, GEMINI_MODEL
    
    # Configure Gemini API if not already configured
    if not GEMINI_CONFIGURED:
        # Get Gemini API key from environment
        GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
        
        # Error catching
        if not GEMINI_API_KEY:
            raise ValueError(
                "GEMINI_API_KEY must be set in environment variables"
            )
        
        # Configure the Gemini API
        genai.configure(api_key=GEMINI_API_KEY)
        GEMINI_CONFIGURED = True
    
    return genai, GEMINI_MODEL
