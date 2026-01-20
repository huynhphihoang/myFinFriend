import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

import FormDateFrequency from "../components/forms/FormDateFrequency";
import DetailsInfo from "../components/ui/DetailsInfo";
import ToggleChange from "../components/toggle/ToggleChange";
import CreateTransactionModal from "../components/ui/CreateModal";
import { deleteTransaction,updateTransaction } from "../api/transaction";

import { useExpenseFrequency } from "../hooks/useExpenseFrenquency";
import { createTransaction } from "../api/transaction";

function Details({transactions,setTransactions, transaction, setLoadingState, loadingState, errorState,setErrorState}) {
  /* -------------------- hooks -------------------- */
  const { fetchFrequency, expenseData, incomeData } = useExpenseFrequency();

  /* -------------------- state -------------------- */
  const [active, setActive] = useState("all");
  const [isFiltered, setIsFiltered] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const handleDelete = async (id) => {
    await deleteTransaction(id);
    setTransactions(prev =>
        prev.filter(t => t.transaction_id !== id)
    );
    };

    const handleUpdate = async (updated) => {
    await updateTransaction(updated.transaction_id, updated);
    setTransactions(prev =>
        prev.map(t =>
        t.transaction_id === updated.transaction_id ? updated : t
        )
    );
    };

  /* -------------------- frequency filter -------------------- */
  const handleFrequencySubmit = async (payload) => {
    try {
      setLoadingState(true);
      setIsFiltered(true);

      await fetchFrequency(payload);

      setTransactions([
        ...(incomeData || []),
        ...(expenseData || []),
      ]);
    } catch (err) {
      setErrorState(err.message);
    } finally {
      setLoadingState(false);
    }
  };

  const resetFilter = () => {
    setIsFiltered(false);
    setTransactions(transaction || []);
  };

  /* -------------------- derived data -------------------- */
  const filteredTransactions = useMemo(() => {
    if (active === "income") {
      return transactions.filter(t => t.transaction_amount > 0);
    }
    if (active === "expense") {
      return transactions.filter(t => t.transaction_amount < 0);
    }
    return transactions;
  }, [transactions, active]);

  /* -------------------- create transaction -------------------- */
  const handleCreate = async (newTransaction) => {
    try {
      const created = await createTransaction(newTransaction);
      console.log(created[0])
      setTransactions(prev => [created[0],...prev]);
      toast.success("Successfully created");
      setOpenCreate(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  /* -------------------- render -------------------- */
  return (
    <div className="font-manrope">
      {/* Header */}
      <div className="flex items-center my-5 relative">
        <Link to="/" className="ml-3">
          <button className="text-sm flex items-center shadow-lg font-bold gap-2 border border-black rounded-full px-5 py-3 hover:bg-black hover:text-white transition">
            <FaArrowLeft />
            Back to the dashboard
          </button>
        </Link>

        <h2 className="absolute left-1/2 -translate-x-1/2 font-bold text-2xl">
          Transaction Details
        </h2>
      </div>

      {/* Filter */}
      <div className="flex justify-center my-4">
        <FormDateFrequency
          fetchFrequency={fetchFrequency}
          onSubmitStart={handleFrequencySubmit}
          loading={loadingState}
        />
      </div>

      {/* Controls */}
      <nav className="w-5/6 mx-auto">
        <div className="flex items-center gap-4">
          <ToggleChange active={active} setActive={setActive} />

          <button
            className="flex items-center border border-black px-6 py-2 rounded-full gap-1 bg-green-500 hover:bg-green-700 text-white hover:-translate-y-1 transition duration-700"
            onClick={() => setOpenCreate(true)}
          >
            <IoMdAdd /> Add
          </button>

          {isFiltered && (
            <button
              onClick={resetFilter}
              className="text-sm underline text-gray-600"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Data */}
        <DetailsInfo
        data={filteredTransactions}
        active={active}
        loading={loadingState}
        error={errorState}
        isFiltered={isFiltered}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        />
      </nav>

      {/* Create modal */}
      {openCreate && (
        <CreateTransactionModal
          onClose={() => setOpenCreate(false)}
          onSave={handleCreate}
        />
      )}
    </div>
  );
}

export default Details;
