# api/transactions.py - the file to handle the information from the frontend to backend and return.

# Necessary imports.
from flask import Blueprint
from flask import request, jsonify
from db.supabase_functions import get_transactions_from_supabase, get_transaction_summary, insert_transaction_supabase, upload_file_supabase, verify_upload_status
from db.supabase_client import get_supabase_anon
from ai.gemini_client import extract_transactions
from flows.file_parser import parse_file
from flows.ai_parser import parse_ai_json
from analytics.analytical_functions import get_expenses_by_categories

# The URL for the api to connect
bp = Blueprint("transactions", __name__, url_prefix="/transactions")

@bp.get("/summary")
def get_summary_transactions():
    # Get the authorization from the frontend
    auth = request.headers.get("Authorization")

    # return the error if there is no token.
    if not auth:
        return jsonify({"error": "Missing token"}), 401
    
    # Get the token from the auth
    token = auth.split(" ")[1]
    
    # Connect with the SUPABASE
    SUPABASE_CLIENT_ANON = get_supabase_anon(token)
    result = get_transaction_summary(SUPABASE_CLIENT_ANON)
    return result

@bp.get("/detailed_transactions")
def get_detailed_transactions():
    # Get the authorization from the frontend
    auth = request.headers.get("Authorization")

    # return the error if there is no token.
    if not auth:
        return jsonify({"error": "Missing token"}), 401

    # Get the token from the auth
    token = auth.split(" ")[1]
    
    # Connect with the SUPABASE
    SUPABASE_CLIENT_ANON = get_supabase_anon(token)
    result = get_transactions_from_supabase(SUPABASE_CLIENT_ANON)
    return result

@bp.get("/expense_categories")
def get_expesne_categories():
    # Get the authorization from the frontend
    auth = request.headers.get("Authorization")

    # return the error if there is no token.
    if not auth:
        return jsonify({"error": "Missing token"}), 401

    # Get the token from the auth
    token = auth.split(" ")[1]
    
    # Connect with the SUPABASE
    SUPABASE_CLIENT_ANON = get_supabase_anon(token)
    result = get_transactions_from_supabase(SUPABASE_CLIENT_ANON)
    expesne_categories_result = get_expenses_by_categories(result)
    print(expesne_categories_result)
    return expesne_categories_result

@bp.post("/", strict_slashes=False)
def upload_file():
    try:
        if request.method == "OPTIONS":
            return "", 200
        if "file" not in request.files:
            return {"error": "No file provided"}, 400

        # Get the file and auth
        file = request.files["file"]
        auth = request.headers.get("Authorization")

        # return the error if there is no token.
        if not auth:
            return jsonify({"error": "Missing token"}), 401
        
        # Get the token from the auth and necessary variables.
        token = auth.split(" ")[1]
        mime_type = file.content_type
        file_bytes = file.read()
        
        # Connect with the SUPABASE
        SUPABASE_CLIENT_ANON = get_supabase_anon(token)
        

        pdf_text = parse_file(file_bytes, mime_type)
        
        # Refresh the Supabase Client Anon
        SUPABASE_CLIENT_ANON.auth.set_session(
            access_token=token,
            refresh_token=""
        )
        

        if not pdf_text.strip():
            return {"error": "No text found in PDF"}, 400
        
        print("AI is reading the file......")
        # Extract the JSON form from ai
        result = extract_transactions(pdf_text,SUPABASE_CLIENT_ANON)
        
        # Take the JSON object.
        parse_ai = parse_ai_json(result)
        print(parse_ai)
        insert_transaction_supabase(SUPABASE_CLIENT_ANON, parse_ai)
        
        return jsonify({
                "success": True,
                "message": "Transactions uploaded successfully"
            }), 200
    
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500