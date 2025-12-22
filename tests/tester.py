import os 
import sys

from source.file_validator import validate_file
from source.pdf_parser import parse_pdf
from source import gemini_client


# This is the central workflow testing file

#User uploads file into webpage -> pdf OR CSV - Supabase step

#Validates if file is the correct type
#If PDF returns 1
#If CSV returns 0
#If not return -1 -> outputs error message
#use file_validator.py to validate the file
result_Validator =validator.validate_file(r"C:\Users\hoang\OneDrive\Documents\Work\Qantas Lounge\Payslips\Payslip 20251111-20251124.pdf")
if result_Validator == 1:
    print("File is a PDF")
elif result_Validator == 0:
    print("File is a CSV")
else:
    print("File is not a PDF or CSV")

#Stores into Upload Storage table in Supabase
#Retrieves file from Upload Storage table
#Parses the file using pdf_parser.py
result_parser = parser.parse_pdf(r"C:\Users\hoang\OneDrive\Documents\Work\Qantas Lounge\Payslips\Payslip 20251111-20251124.pdf")