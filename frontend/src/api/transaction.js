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

export async function fetchTransactionSummary() {
  // Send get request to backend to get all text
  const res = await fetch(`${API_URL}/transactions`);

  // Verify the response
  if (!res.ok) {
    throw new Error("Failed to fetch text");
  }

  // Return the json of the response
  return res.json();
}

export async function uploadTransaction(file) {

  // If file return the messages.
  if (!file) return alert("Please select a file");

  // Create form data
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/transactions`, {
  method: "POST",
  body: formData,
  });

  // If fail to get response, throw error with the msg or defaut message
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || "Failed to create animal");
  }

  // Return the json of the response
  return res.json();
}