# api/transactions.py
from flask import Blueprint
from flask import Flask, jsonify
from db.category_extractor import get_transaction_categories
from ai.gemini_client import extract_transactions
from flows.pdf_parser import parse_pdf
import json

bp = Blueprint("transactions", __name__, url_prefix="/transactions")

@bp.get("/")
def get_transactions():
    response = get_transaction_categories()
    return jsonify(response)

@bp.get("/detailed_transactions")
def get_detailed_transactions():
    pdf_text = parse_pdf("payslip/PaySlip.pdf")

    if not pdf_text.strip():
        return {"error": "No text found in PDF"}, 400

    # Testing
    result = '''
        {
        "transaction_date": "2025-12-15",
        "transaction_details": "Salary Payment",
        "transaction_amount": "$402.50",
        "transaction_category": "Other",
        "transaction_type": 2,
        "relevant": true
        }
        '''

    print(json.loads(result))
    return [json.loads(result)]