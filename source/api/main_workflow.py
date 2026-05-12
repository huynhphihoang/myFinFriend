# Necessary imports.
from fastapi import APIRouter, Request, Header, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from db.supabase_functions import (
    get_transactions_from_supabase, get_transaction_summary,
    insert_transaction_supabase, upload_file_supabase, verify_upload_status,
    delete_transaction, update_transaction, find_transaction_supabase
)
from db.supabase_client import get_supabase_anon
from ai.gemini_client import extract_transactions
from flows.file_parser import parse_file
from flows.ai_parser import parse_ai_json
from analytics.analytical_functions import (
    get_expenses_by_categories, get_expenses_by_frequency,
    get_income_by_frequency, get_total_expense_by_date_range,
    get_total_income_by_date_range, get_transactions_by_date_range
)
from datetime import datetime
from pydantic import BaseModel
from typing import Optional

# The URL for the api to connect
router = APIRouter(prefix="/transactions")


# --- Pydantic models for request bodies ---
class DateRangeRequest(BaseModel):
    start_date: str
    end_date: str

class DateRangeFrequencyRequest(BaseModel):
    start_date: str
    end_date: str
    frequency: Optional[str] = None

class TransactionUpdateRequest(BaseModel):
    # Accept any fields for update
    model_config = {"extra": "allow"}

class TransactionCreateRequest(BaseModel):
    model_config = {"extra": "allow"}


# --- Helper to extract token ---
def extract_token(authorization: Optional[str]) -> str:
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing token")
    return authorization.split(" ")[1]


# --- Routes ---

@router.get("/summary")
def get_summary_transactions(authorization: Optional[str] = Header(default=None)):
    token = extract_token(authorization)
    SUPABASE_CLIENT_ANON = get_supabase_anon(token)
    result = get_transaction_summary(SUPABASE_CLIENT_ANON)
    return result


@router.get("/detailed_transactions")
def get_detailed_transactions(authorization: Optional[str] = Header(default=None)):
    token = extract_token(authorization)
    SUPABASE_CLIENT_ANON = get_supabase_anon(token)
    result = get_transactions_from_supabase(SUPABASE_CLIENT_ANON)
    return result


@router.get("/expense_categories")
def get_expense_categories(authorization: Optional[str] = Header(default=None)):
    token = extract_token(authorization)
    SUPABASE_CLIENT_ANON = get_supabase_anon(token)
    result = get_transactions_from_supabase(SUPABASE_CLIENT_ANON)
    expense_categories_result = get_expenses_by_categories(result)
    print(expense_categories_result)
    return expense_categories_result


@router.post("/", status_code=200)
async def upload_file(
    file: UploadFile = File(...),
    authorization: Optional[str] = Header(default=None)
):
    try:
        token = extract_token(authorization)
        mime_type = file.content_type
        file_bytes = await file.read()

        SUPABASE_CLIENT_ANON = get_supabase_anon(token)

        pdf_text = parse_file(file_bytes, mime_type)

        # Refresh the Supabase Client Anon
        SUPABASE_CLIENT_ANON.auth.set_session(
            access_token=token,
            refresh_token=""
        )

        if not pdf_text.strip():
            return JSONResponse(status_code=400, content={"error": "No text found in PDF"})

        print("AI is reading the file......")
        result = extract_transactions(pdf_text, SUPABASE_CLIENT_ANON)

        parse_ai = parse_ai_json(result)
        upload_file_supabase(SUPABASE_CLIENT_ANON, file_bytes, file.filename, mime_type)
        insert_transaction_supabase(SUPABASE_CLIENT_ANON, parse_ai)

        return {"success": True, "message": "Transactions uploaded successfully"}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/expense_frequency")
def get_expenses_frequency(
    body: DateRangeFrequencyRequest,
    authorization: Optional[str] = Header(default=None)
):
    token = extract_token(authorization)
    supabase = get_supabase_anon(token)

    start_dt = datetime.fromisoformat(body.start_date)
    end_dt = datetime.fromisoformat(body.end_date)

    data = get_transactions_from_supabase(supabase)
    result = get_expenses_by_frequency(body.frequency, data, start_dt, end_dt)
    return result


@router.post("/income_frequency")
def get_income_frequency(
    body: DateRangeFrequencyRequest,
    authorization: Optional[str] = Header(default=None)
):
    token = extract_token(authorization)
    supabase = get_supabase_anon(token)

    start_dt = datetime.fromisoformat(body.start_date)
    end_dt = datetime.fromisoformat(body.end_date)

    data = get_transactions_from_supabase(supabase)
    result = get_income_by_frequency(body.frequency, data, start_dt, end_dt)
    return result


@router.post("/income_date_range")
def get_income_date_range(
    body: DateRangeRequest,
    authorization: Optional[str] = Header(default=None)
):
    token = extract_token(authorization)
    supabase = get_supabase_anon(token)

    start_dt = datetime.fromisoformat(body.start_date)
    end_dt = datetime.fromisoformat(body.end_date)

    data = get_transactions_from_supabase(supabase)
    result = get_total_income_by_date_range(data, start_dt, end_dt)
    return {"total_income": result[0]["total_income"]}


@router.post("/expense_date_range")
def get_expense_date_range(
    body: DateRangeRequest,
    authorization: Optional[str] = Header(default=None)
):
    token = extract_token(authorization)
    supabase = get_supabase_anon(token)

    start_dt = datetime.fromisoformat(body.start_date)
    end_dt = datetime.fromisoformat(body.end_date)

    data = get_transactions_from_supabase(supabase)
    result = get_total_expense_by_date_range(data, start_dt, end_dt)
    return {"total_expense": result[0]["total_expense"]}


@router.post("/categories_date_range")
def get_categories_date_range(
    body: DateRangeRequest,
    authorization: Optional[str] = Header(default=None)
):
    token = extract_token(authorization)
    supabase = get_supabase_anon(token)

    start_dt = datetime.fromisoformat(body.start_date)
    end_dt = datetime.fromisoformat(body.end_date)

    data = get_transactions_from_supabase(supabase)
    filtered_data = get_transactions_by_date_range(data, start_dt, end_dt)
    filtered_data_by_categories = get_expenses_by_categories(filtered_data)
    print(filtered_data_by_categories)
    return filtered_data_by_categories


@router.delete("/{transaction_id}")
def delete_a_transaction(
    transaction_id: int,
    authorization: Optional[str] = Header(default=None)
):
    token = extract_token(authorization)
    supabase = get_supabase_anon(token)
    print(transaction_id)
    is_delete = delete_transaction(supabase, transaction_id)
    return {"status": is_delete}


@router.put("/{transaction_id}")
def update_a_transaction(
    transaction_id: int,
    data: dict,
    authorization: Optional[str] = Header(default=None)
):
    token = extract_token(authorization)
    supabase = get_supabase_anon(token)
    updated_data = update_transaction(supabase, data)
    return {"data": updated_data}


@router.post("/create")
def create_a_transaction(
    data: dict,
    authorization: Optional[str] = Header(default=None)
):
    token = extract_token(authorization)
    supabase = get_supabase_anon(token)
    insert_transaction_supabase(supabase, data)
    created_data = find_transaction_supabase(supabase, data)
    print(created_data)
    return created_data