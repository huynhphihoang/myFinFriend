import os 
import sys
from api import register_blueprints
from ai.gemini_client import extract_transactions
from flask import Flask
from flask_cors import CORS


# Add project root to Python path so imports work
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)

from flows.pdf_parser import parse_pdf


# # This is the central workflow testing file

# # 1 User uploads file into webpage -> pdf OR CSV - Supabase step

# #Validates if file is the correct type
# #If PDF returns 1
# #If CSV returns 0
# #If not return -1 -> outputs error message
# #use file_validator.py to validate the file
# result_Validator = validate_file(r"source/payslip/PaySlip.pdf")

# #Test file validator
# if result_Validator == 1:
#     print("File is a PDF")
# elif result_Validator == 0:
#     print("File is a CSV")
# else:
#     print("File is not a PDF or CSV")

# #Stores into Upload Storage table in Supabase
# #Retrieves file from Upload Storage table
# #Parses the file using pdf_parser.py
# result_parser = parse_pdf(r"payslip/PaySlip.pdf")


# #Test get transaction categories
# print("Testing get_transaction_categories()...")
# categories = get_transaction_categories_with_ids()
# print(f"Categories: {categories}")

#Call Gemini response

app = Flask(__name__)

CORS(app)

register_blueprints(app)

if __name__ == "__main__":
    app.run(debug=True)
