// This file contains all the fetch from the backend to the frontend.

// Necessary imports
import { supabase } from "../supabaseClient";

// The URL link
const API_URL = "http://127.0.0.1:8000";

// Get the data from the supabase to find out if the user logged in or not.
const { data } = await supabase.auth.getSession();
const session = data.session;
console.log(data);

/* This fetch GET the all transactions with detail information. */
export async function fetchTransactions() {
  if (!session) {
    throw new Error("User not authenticated");
  }
  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/transactions/detailed_transactions`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );

  // Verify the response
  if (!res.ok) {
    throw new Error("Failed to fetch text");
  }

  // Return the json of the response
  return res.json();
}

/*   This fetch GET the summary of all transactions.   */
export async function fetchTransactionSummary() {
  if (!session) {
    throw new Error("User not authenticated");
  }
  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/transactions/summary`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );

  // Verify the response
  if (!res.ok) {
    throw new Error("Failed to fetch text");
  }

  // Return the json of the response
  return res.json();
}

/*   This fetch GET the summary of all transactions.   */
export async function fetchExpenseCategory() {
  if (!session) {
    throw new Error("User not authenticated");
  }
  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/transactions/expense_categories`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );

  // Verify the response
  if (!res.ok) {
    throw new Error("Failed to fetch text");
  }

  // Return the json of the response
  return res.json();
}

 /*    This fetch post the information to the api and GET the expense transaction by frequency   */
export async function fetchExpenseFrequency(payload) {
  if (!session) {
    throw new Error("User not authenticated");
  }

  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/transactions/expense_frequency`,
    { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body:  JSON.stringify({
        frequency: payload.frequency,
        start_date: payload.start_date,
        end_date: payload.end_date,
    }),
    }
  );

  // Verify the response
  if (!res.ok) {
    throw new Error("Failed to fetch text");
  }

  // Return the json of the response
  return res.json();
}

 /*   This fetch post the information to the api and GET the income transaction by frequency   */
export async function fetchIncomeFrequency(payload) {
  if (!session) {
    throw new Error("User not authenticated");
  }

  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/transactions/income_frequency`,
    { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body:  JSON.stringify({
        frequency: payload.frequency,
        start_date: payload.start_date,
        end_date: payload.end_date,
    }),
    }
  );

  // Verify the response
  if (!res.ok) {
    throw new Error("Failed to fetch text");
  }

  // Return the json of the response
  return res.json();
}

 /*   This fetch post the start date and end date to the api and GET the total income by date range   */
export async function fetchIncomeDateRange(payload) {
  if (!session) {
    throw new Error("User not authenticated");
  }

  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/transactions/income_date_range`,
    { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body:  JSON.stringify({
        start_date: payload.start_date,
        end_date: payload.end_date,
    }),
    }
  );

  // Verify the response
  if (!res.ok) {
    throw new Error("Failed to fetch text");
  }

  // Return the json of the response
  return res.json();
}

 /*   This fetch post the start date and end date to the api and GET the total expense of each category by date range   */
export async function fetchCategoriesDateRange(payload) {
  if (!session) {
    throw new Error("User not authenticated");
  }

  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/transactions/categories_date_range`,
    { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body:  JSON.stringify({
        start_date: payload.start_date,
        end_date: payload.end_date,
    }),
    }
  );

  // Verify the response
  if (!res.ok) {
    throw new Error("Failed to fetch text");
  }

  // Return the json of the response
  return res.json();
}

   /*   This fetch post the start date and end date to the api and GET the total expense by date range   */
export async function fetchExpenseDateRange(payload) {
  if (!session) {
    throw new Error("User not authenticated");
  }

  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/transactions/expense_date_range`,
    { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body:  JSON.stringify({
        start_date: payload.start_date,
        end_date: payload.end_date,
    }),
    }
  );

  // Verify the response
  if (!res.ok) {
    throw new Error("Failed to fetch text");
  }

  // Return the json of the response
  return res.json();
}

/*   This fetch UPLOAD the given file into the storage.   */
export async function uploadTransaction(file) {
  if (!session) {
    throw new Error("User not authenticated");
  }
  
  // If file return the messages.
  if (!file) return alert("Please select a file");

  // Create form data
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/transactions`, {
  method: "POST",
  body: formData,
  headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
  });

  // If fail to get response, throw error with the msg or defaut message
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || "Failed to upload the transaction.");
  }

  // Return the json of the response
  return res.json();
}

/*   This fetch update the transaction   */
export async function updateTransaction(id, payload) {
  if (!session) {
    throw new Error("User not authenticated");
  }

  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/transactions/${id}`,
    { 
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  // Verify the response
  if (!res.ok) {
    throw new Error("Failed to fetch text");
  }

  // Return the json of the response
  return res.json();
}

   /*   This fetch create the transaction   */
export async function createTransaction(payload) {
  if (!session) {
    throw new Error("User not authenticated");
  }

  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/transactions/create`,
    { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  // Verify the response
  if (!res.ok) {
    throw new Error("Failed to fetch text");
  }

  console.log(res)
  // Return the json of the response
  return res.json();
}

   /*   This fetch delete the transaction   */
export async function deleteTransaction(transaction_id) {
  if (!session) {
    throw new Error("User not authenticated");
  }

  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/transactions/${transaction_id}`,
    { 
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );

  // Verify the response
  if (!res.ok) {
    throw new Error("Failed to fetch text");
  }

  // Return the json of the response
  return res.json();
}