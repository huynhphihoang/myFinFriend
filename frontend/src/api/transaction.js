// This file contains all the fetch from the backend to the frontend.

// Necessary imports
import { supabase } from "../supabaseClient";

// The URL link
const API_URL = "http://127.0.0.1:5000";

// Get the data from the supabase to find out if the user logged in or not.
const { data } = await supabase.auth.getSession();
const session = data.session;

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