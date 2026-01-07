import { useEffect, useState } from "react";

import { fetchExpenseCategory } from "../api/transaction";

export function useExpenseCategories() {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchExpenseCategory();
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

  return { transaction, loading, error };
}
