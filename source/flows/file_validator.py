#To validate if file is either PDF or CSV
def validate_file(file_path):
    if file_path.endswith('.pdf'):
        return 1
    elif file_path.endswith('.csv'):
        return 0
    else: return -1