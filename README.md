#myFinFriend
A personal financial management web-app that integrates AI-powered tools to keep on track of your spending and budget


#Supabase Schemas


#Supabase RSL Policy
- Users can **only read their own rows**
- Users can **insert new rows for themselves**
- Users can **update their own rows** (unfinished)
- Users *cannot* access/read/update other users' rows
- Backend (server) has access to every users' rows.