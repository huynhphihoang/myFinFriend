import Income from "../toggle/Income";
import Usage from "../toggle/Usage";
import AllTransaction from "../toggle/AllTransaction";
import Loading from "../animations/Loading";
import { toast } from "react-toastify";
import { useState } from "react";
import EditTransactionModal from "./EditModal";

export default function DetailsInfo({
  data,
  active,
  loading,
  error,
  isFiltered,
  onDelete,
  onUpdate,
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  /* ---------- handlers ---------- */
  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setEditOpen(true);
  };

  const handleSave = async (updatedTransaction) => {
    try {
      await onUpdate(updatedTransaction);
      toast.success("Successfully updated transaction");
      setEditOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
      toast.success("Successfully deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  /* ---------- render ---------- */
  if (error) {
    return (
      <div className="text-rose-700 text-xl mt-4">
        There is an error. Please contact IT support.
      </div>
    );
  }

  return (
    <div>
    {loading && (<Loading/>)}
    
    {active === "income" && (
    <Income
        transaction={data}
        isFiltered={isFiltered}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
    )}

    {active === "expense" && (
    <Usage
        transaction={data}
        isFiltered={isFiltered}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
    )}

    {active === "all" && (
    <AllTransaction
        transaction={data}
        isFiltered={isFiltered}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
    )}

    {editOpen && (
    <EditTransactionModal
        transaction={selectedTransaction}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
    />
    )}
    </div>
  );
}