# api/transactions.py
from flask import Blueprint
from flask import Flask, jsonify
from db.category_extractor import get_transaction_categories
from ai.gemini_client import extract_transactions
from flows.pdf_parser import parse_pdf
from flows.ai_parser import parse_ai_json
import json

bp = Blueprint("transactions", __name__, url_prefix="/transactions")

@bp.get("/")
def get_transactions():
    response = get_transaction_categories()
    return jsonify(response)

@bp.get("/detailed_transactions")
def get_detailed_transactions():
    pdf_text = parse_pdf("payslip/your_pay_slip")

    if not pdf_text.strip():
        return {"error": "No text found in PDF"}, 400

    # Extract the JSON form from ai
    result = extract_transactions(pdf_text)
    
    # Take the JSON object.
    parse_ai = parse_ai_json(result)

    return [parse_ai]