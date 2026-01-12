import { useEffect, useState } from "react";

import { fetchTransactions } from "../api/transaction";

export function useTransaction() {
  const [transaction, setTransaction] = useState([]);
  const [loadingTransaction, setLoading] = useState(true);
  const [errorTransaction, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchTransactions();
        setTransaction(data ?? []);
        setError(null);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { transaction, loadingTransaction, errorTransaction };
}
