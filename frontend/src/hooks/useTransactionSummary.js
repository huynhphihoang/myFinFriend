import { fetchTransactionSummary } from "../api/transaction";
import {useState, useEffect} from "react";

export function useTransactionSummary() {
  const [transactionSummary, setTransactionSummary] = useState([]);
  const [loadingSummary, setLoading] = useState(true);
  const [errorSummary, setError] = useState(null);

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

  return { transactionSummary, loadingSummary, errorSummary };
}