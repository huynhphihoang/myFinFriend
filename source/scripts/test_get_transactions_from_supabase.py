from db.supabase_client import get_supabase_anon
from db.supabase_functions import get_transactions_from_supabase


if __name__ == "__main__":
    SUPABASE_CLIENT_ANON = get_supabase_anon()

    SUPABASE_CLIENT_ANON.auth.sign_in_with_password({
        "email":"11a4huynhphihoang06@gmail.com",
        "password":"12345678910"
    })

    result = (
        SUPABASE_CLIENT_ANON.table("Transaction History")
        .select("*")
        .execute()
    )

    rows = result.data
    print(rows)