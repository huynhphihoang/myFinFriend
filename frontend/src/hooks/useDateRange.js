import { useState } from "react";

import { fetchIncomeDateRange } from "../api/transaction";
import { fetchExpenseDateRange } from "../api/transaction";

export function useDateRange() {
  const [totalIncome, setTotalIncome] = useState([]);
  const [totalExpense, setTotalExpense] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchTotalDateRange(payload) {
    setLoading(true);
    try {
      const resIncome = await fetchIncomeDateRange(payload);
      const resExpense = await fetchExpenseDateRange(payload);
      setTotalIncome(resIncome);
      setTotalExpense(resExpense);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { fetchTotalDateRange, totalIncome, totalExpense, loading, error };
}