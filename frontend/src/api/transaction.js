const API_URL = "http://127.0.0.1:5000";

export async function fetchTransactions() {
  // Send get request to backend to get all text
  const res = await fetch(`${API_URL}/transactions/detailed_transactions`);

  // Verify the response
  if (!res.ok) {
    throw new Error("Failed to fetch text");
  }

  // Return the json of the response
  return res.json();
}