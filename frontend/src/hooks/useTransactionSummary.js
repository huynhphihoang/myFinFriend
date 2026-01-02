import { fetchTransactionSummary } from "../api/transaction";
import {useState, useEffect} from "react";

export function useTransactionSummary() {
  const [transactionSummary, setTransactionSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchTransactionSummary();
        setTransactionSummary(data ?? []);
        setError(null);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { transactionSummary, loading, error };
}