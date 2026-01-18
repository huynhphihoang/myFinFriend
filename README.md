# myFinFriend
A personal financial management web-app that integrates AI-powered tools to keep on track of your spending and budget

# Technologies
- Backend: Python (flask)
- Frontend: ReactJS, TailwindCSS, Toastify.
- Database: Supabase.
- Analytics: pandas

## Technologies Used

[![Python](https://img.shields.io/badge/Python-Latest-red)](https://docs.python.org/3/)
[![Flask](https://img.shields.io/badge/Flask-Latest-red)](https://flask.palletsprojects.com/)

[![React](https://img.shields.io/badge/ReactJS-Latest-blue)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Latest-yellow)](https://tailwindcss.com/docs)
[![Toastify](https://img.shields.io/badge/Toastify-Latest-purple)](https://fkhadra.github.io/react-toastify/introduction)

[![Supabase](https://img.shields.io/badge/Supabase-Latest-brightgreen)](https://supabase.com/docs)

[![pandas](https://img.shields.io/badge/pandas-Latest-darkblue)](https://pandas.pydata.org/docs/)

# How to run
## Frontend
- Navigate to the folder "frontend" and then type `npm install`
- Wait until the system is done downloading.
- Finally, type `npm start` to start the website.

## Backend
- Navigate to the folder "source" and then type `pip install -r requirements.txt` to download the requirements
- Then, type `python main` to run the backend while running the frontend.

# UI/UX website
## Dashboard page
![App Screenshot](frontend/public/images/dashboard.png)
- The main page that allow user to upload the file (.csv or .pdf) to the website.
- The website allow them to put the start date and end date to view the income, expense and balance between the date.
- There are five information for the user to view: Income box, expense box, balance box, expense categories, and the comparison of income and expense.
- There are some buttons to route the other pages: `View transactions`, `avatar-icon`

## Details page
![App Screenshot](frontend/public/images/detail-page.png)
- The date range function with frequency allows the user to view the finance based on the frequency and the date between so that they can know how much they have spent in each frequency (weekly, monthly, quarterly) between the date.
- There are toggles that allow user to change three tables (income, expense, and all transactions)

## SignUp&LogIn page
![App Screenshot](frontend/public/images/log-in&sign-up-page.png)
- Allow the user to sign up their account if they didn't have any account.
- Allow the user to change to log in page for accessing their account.

## Profile page
![App Screenshot](frontend/public/images/profile-page.png)
- Allow the user to know which the account is.
- Allow to go to dashboard and details transaction
- Allow the user to log out the account with the notification "Successfully log out"
  
---

# Data Schemas and Backend Configuration
## Supabase Schemas
1. category_list

| Column Name   | Data Type | Notes          |
| ------------- | --------- | -------------- |
| category_id   | INT2      | Primary Key    |
| category_name | VARCHAR   | Category label |

This table keeps the list of default categories a record can be put into. 
**Future Improvements**: Allowing users to be able to choose from the default list AND adding their own categorisation.

2. transaction_history

| Column Name         | Data Type | Notes                                 |
| ------------------- | --------- | ------------------------------------- |
| transaction_id      | INT8      | Primary Key                           |
| user_id             | UUID      | FK → auth.users                       |
| transaction_amount  | FLOAT4    | Negative = expense, positive = income |
| transaction_details | VARCHAR   | Description                           |
| transaction_date    | DATE      | Transaction date                      |
| transaction_category_id         | INT2      | FK → category_list.category_id        |

This table stores the records of each users' transaction, is the central of myFinFriend. 
Analytical insights are produced using data from this source.
**Future Expansion**: Integrating an AI Agent to produce analytics, charts and insights just from user's prompt.

3. upload_storage

| Column Name   | Data Type | Notes                    |
| ------------- | --------- | ------------------------ |
| upload_id     | INT8      | Primary Key              |
| user_id       | UUID      | FK → auth.users          |
| upload_status | VARCHAR   | e.g. pending / processed |
| created_at    | TIMESTAMP | Upload time              |
| storage_path  | TEXT      | Supabase storage path    |

This table serves as a processing queue for the API calls for documentation uploads preventing overloading the API calls to an external AI model.
It is also used to automatically cleaned expired documents, which is customizable. For example, it can be set to clean up every 30 minutes or every 3 days.

## Supabase RLS Policy
The following RLS policies have been set using PostgreSQL:
- Users can **only read their own rows**.
- Users can **insert new rows for themselves**.
- Users can **update their own rows**.
- Users can **delete their own rows**
- Users *cannot* access/read/update other users' rows
- Backend (server) has access to every users' rows.





