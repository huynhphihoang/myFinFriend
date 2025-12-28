from flows.pdf_parser import parse_pdf

if __name__ == "__main__":
    #Test if pdf parser correctly parses pdfs
    results = parse_pdf("/mnt/c/Users/hoang/OneDrive/Documents/Work/Qantas Lounge/Payslips/Payslip 20251111-20251124.pdf")

    print(results)
