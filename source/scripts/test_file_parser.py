from flows.file_parser import parse_file

if __name__ == "__main__":
    #Test if pdf parser correctly parses pdfs
    text_csv = parse_file("/mnt/c/Users/hoang/OneDrive/Documents/GitHub/myFinFriend/source/scripts/test_analytical_functions.csv")

    print(text_csv)