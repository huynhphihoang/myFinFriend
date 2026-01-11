import { useState } from "react";

import { fetchExpenseFrequency } from "../api/transaction";
import { fetchIncomeFrequency } from "../api/transaction";

export function useExpenseFrequency() {
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchFrequency(payload) {
    setLoading(true);
    try {
      const resExpense = await fetchExpenseFrequency(payload);
      const resIncome = await fetchIncomeFrequency(payload);
      setExpenseData(resExpense);
      setIncomeData(resIncome)
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { fetchFrequency, expenseData, incomeData, loading, error };
}
