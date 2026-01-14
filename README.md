# myFinFriend
A personal financial management web-app that integrates AI-powered tools to keep on track of your spending and budget

# Technologies
- Backend: Python (flask)
- Frontend: ReactJS, TailwindCSS, Toastify.
- Database: Supabase.

# How to download
## Frontend
- Go to the folder "frontend" and then type `npm install`
- Wait until the system is done download.
- Finally, type `npm start` to start the website.

## Backend
- Go to the folder "source" and then type `pip install -r requirements.txt` to download the requirements
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

# Supabase Schemas


# Supabase RSL Policy
- Users can **only read their own rows**
- Users can **insert new rows for themselves**
- Users can **update their own rows** (unfinished)
- Users *cannot* access/read/update other users' rows
- Backend (server) has access to every users' rows.


