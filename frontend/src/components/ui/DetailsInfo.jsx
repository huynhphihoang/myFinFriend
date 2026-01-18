import Income from "../toggle/Income";
import Usage from "../toggle/Usage";
import AllTransaction from "../toggle/AllTransaction";
import Loading from "../animations/Loading";
import { deleteTransaction,updateTransaction } from "../../api/transaction";
import { toast } from "react-toastify";
import { useState } from "react";
import EditTransactionModal from "./EditModal";

export default function DetailsInfo({dataToRenderExpense, dataToRenderIncome, dataToRenderAll, active, loadingRender, errorRender, hasIncomeFilter,hasExpenseFilter}){
    const [editOpen, setEditOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleUpdate = async (updatedTransaction) => {
    try {
        await updateTransaction(updatedTransaction.transaction_id,updatedTransaction);
        toast.success("Sucessfully Update Transaction!!")
        setEditOpen(false);
        setTimeout(() => {
        window.location.reload();
        }, 500); 
    } catch (err) {
        alert(err.message);
    }
    };
    const handleDelete = async (id) => {
        try {
        await deleteTransaction(id);
        toast.success("successfully deleted")
        setTimeout(() => {
        window.location.reload();
        }, 500); 
        } catch (err) {
        alert(err.message);
        }
    };

    const handleEdit = (transaction) => {
        setSelectedTransaction(transaction);
        setEditOpen(true);
    };
    
    return(
        <div>
            {errorRender ? (<div className="text-rose-700 text-xl mt-4">There is an error. Please contact to IT support.</div>) : (    
            <div> 
                {loadingRender ? (<Loading/>) : (
                        <div> 
                            {active == "income" && (
                        <Income transaction={dataToRenderIncome} handleDelete={handleDelete} hasExpenseFilter={hasExpenseFilter} hasIncomeFilter={hasIncomeFilter} handleEdit={handleEdit}/>
                    )} 
                    
                    {active == "expense" && (                 
                        <Usage transaction={dataToRenderExpense} hasExpenseFilter={hasExpenseFilter} hasIncomeFilter={hasIncomeFilter} handleEdit={handleEdit} handleDelete={handleDelete}/>
                    )}
                {active == "all" && (                 
                        <AllTransaction transaction={dataToRenderAll} hasExpenseFilter={hasExpenseFilter} hasIncomeFilter={hasIncomeFilter} handleEdit={handleEdit} handleDelete={handleDelete}/>
                    )}
                        </div>)}
                
            </div>)}
           
           {editOpen && (
            <EditTransactionModal
                transaction={selectedTransaction}
                onClose={() => setEditOpen(false)}
                onSave={handleUpdate}
            />
            )}
        </div>
    );
}