# import os 
# import sys

# # Add project root to Python path so imports work
# project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# sys.path.insert(0, project_root)

# from source.category_extractor import get_transaction_categories_with_ids
# from source.file_validator import validate_file
# from source.pdf_parser import parse_pdf
# from source import gemini_client


# # This is the central workflow testing file

# # 1 User uploads file into webpage -> pdf OR CSV - Supabase step

# # Validates if file is the correct type
# # If PDF returns 1
# # If CSV returns 0
# # If not return -1 -> outputs error message
# # use file_validator.py to validate the file
# result_Validator = validate_file(r"C:\Users\hoang\OneDrive\Documents\Work\Qantas Lounge\Payslips\Payslip 20251111-20251124.pdf")

# # Test file validator
# if result_Validator == 1:
#     print("File is a PDF")
# elif result_Validator == 0:
#     print("File is a CSV")
# else:
#     print("File is not a PDF or CSV")

# # Stores into Upload Storage table in Supabase
# # Retrieves file from Upload Storage table
# # Parses the file using pdf_parser.py
# result_parser = parse_pdf(r"C:\Users\hoang\OneDrive\Documents\Work\Qantas Lounge\Payslips\Payslip 20251111-20251124.pdf")


# # Test get transaction categories
# print("Testing get_transaction_categories()...")
# categories = get_transaction_categories_with_ids()
# print(f"Categories: {Categories}")

# # Call Gemini response
