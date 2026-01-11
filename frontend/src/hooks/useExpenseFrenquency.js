import { useState } from "react";

import { fetchExpenseFrequency } from "../api/transaction";

export function useExpenseFrequency() {
  const [expenseData, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchFrequency(payload) {
    setLoading(true);
    try {
      const res = await fetchExpenseFrequency(payload);
      setTransaction(res);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { fetchFrequency, expenseData, loading, error };
}
