# myFinFriend
A personal financial management web-app that integrates AI-powered tools to keep on track of your spending and budget

# How to download
## Frontend
- Go to the folder "frontend" and then type `npm install`
- Wait until the system is done download.
- Finally, type `npm start` to start the website.

## Backend
- Go to the folder "source" and then type `pip install -r requirements.txt` to download the requirements
- Then, type `python main` to run the backend while running the frontend.

# Supabase Schemas


# Supabase RSL Policy
- Users can **only read their own rows**
- Users can **insert new rows for themselves**
- Users can **update their own rows** (unfinished)
- Users *cannot* access/read/update other users' rows
- Backend (server) has access to every users' rows.


