# api/transactions.py
from flask import Blueprint
from flask import Flask, request, jsonify
from db.supabase_functions import get_transactions_from_supabase, get_transaction_summary
from db.supabase_client import get_supabase_anon
from ai.gemini_client import extract_transactions
from flows.pdf_parser import parse_pdf
from flows.ai_parser import parse_ai_json
import json

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
    # pdf_text = parse_pdf("payslip/yourp_pay_slip")

    # if not pdf_text.strip():
    #     return {"error": "No text found in PDF"}, 400
    # print("AI is reading the file......")
    # # Extract the JSON form from ai
    # result = extract_transactions(pdf_text)
    
    # # Take the JSON object.
    # parse_ai = parse_ai_json(result)

    # return [parse_ai]

@bp.post("/")
def upload_file():
    if "file" not in request.files:
        return {"error": "No file provided"}, 400

    # Get the file
    file = request.files["file"]

    #TODO: Create the function to save filename into supabase.
    
    print({
        "filename": file.filename,
        "status": "uploaded"
    })
    
    return jsonify({
        "filename": file.filename,
        "status": "uploaded"
    })