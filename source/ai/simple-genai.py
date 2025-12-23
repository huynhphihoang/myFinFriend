import google.generativeai as genai
import os
import tkinter as tk
from tkinter import scrolledtext
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = 'gemini-1.5-flash'

def chat_with_bot(prompt):
    response = model.generate_content(prompt)
    return response.text

# test function
def chat_with_gemini_terminal():
    user_input = input("Enter your prompt to Gemini: ")
    response = chat_with_bot(user_input)
    print("Gemini response:")
    print(response)

if __name__ == "__main__":
    chat_with_gemini_terminal()


