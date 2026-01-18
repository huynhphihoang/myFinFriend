import {Link} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormDateFrequency from "../components/forms/FormDateFrequency";
import DetailsInfo from "../components/ui/DetailsInfo";
import ToggleChange from "../components/toggle/ToggleChange";
import { useExpenseFrequency } from "../hooks/useExpenseFrenquency";
import { useTransaction } from "../hooks/useTransactions";
import {useState, useEffect} from "react";
import { IoMdAdd } from "react-icons/io";
import CreateTransactionModal from "../components/ui/CreateModal";
import {createTransaction} from "../api/transaction";
import { toast } from "react-toastify";

function Details() {
    const { fetchFrequency, expenseData, incomeData, loading, error } = useExpenseFrequency();
    const { transaction, loadingTransaction, errorTransaction } = useTransaction();
    const [openCreate, setOpenCreate] = useState(false);
    const [active, setActive] = useState("all");
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const hasIncomeFilter = incomeData?.length > 0;
    const hasExpenseFilter = expenseData?.length > 0;

    const loadingRender = hasSubmitted ? loading : loadingTransaction;
    const errorRender = hasSubmitted ? error : errorTransaction ;
    
    // Determine which data to get the expense transactions
    const dataToRenderExpense =
    expenseData && expenseData.length > 0
        ? expenseData     
        : transaction
    
    // Determine which data to get the income transactions
    const dataToRenderIncome =
    incomeData && incomeData.length > 0
        ? incomeData     
        : transaction

    // Determine which data to get the all transactions if the filter is using.
    let dataToRenderAll;

    // If Income and expense is filtering, then use the combined data from those dataToRender, 
    // otherwise, use the all transactions data.
    if (hasIncomeFilter || hasExpenseFilter) {
        // backend returned filtered data
        dataToRenderAll = [
            ...(dataToRenderIncome || []),
            ...(dataToRenderExpense || []),
    ];
    } else {
        // fallback: already full dataset
        dataToRenderAll = transaction;
    }

    const handleUpdate = async (updatedTransaction) => {
        try {
            await createTransaction(updatedTransaction);
            toast.success("Successullt Create")
            setOpenCreate(false);
            setTimeout(() => {
                window.location.reload();
            }, 500); 
        } catch (err) {
            alert(err.message);
        }
        };

    // Revert back after submit completes
    useEffect(() => {
        if (!loading && hasSubmitted) {
        setHasSubmitted(false);
        }
    }, [loading]);

    return (
        <div className="font-manrope">
            <div className="flex items-center my-5 relative">
                {/* Back button (left) */}
                <Link to="/" className="ml-3">
                    <button className="text-sm flex items-center shadow-lg font-bold gap-2 border border-black rounded-full px-5 py-3 hover:bg-black hover:text-white transition duration-500">
                    <FaArrowLeft />
                    Back to the dashboard
                    </button>
                </Link>

                {/* Center title */}
                <h2 className="absolute left-1/2 -translate-x-1/2 font-bold text-2xl">
                Transaction Details
                </h2>
            </div>

            <div className="flex justify-center my-4">
                {/*Date between selectors*/}
                <FormDateFrequency fetchFrequency={fetchFrequency} onSubmitStart={() => setHasSubmitted(true)} loading={loadingRender}/>
            </div>

            <nav className="w-5/6 mx-auto">
                <div className="flex">
                    <ToggleChange active={active} setActive={setActive}/>
                    <button className="flex items-center mx-6 border border-black px-6 rounded-full gap-1 bg-green-500 hover:bg-green-700 text-white transition duration-500" onClick={() => setOpenCreate(true)}> <IoMdAdd/> Add </button>
                </div>
                {/* Details information including total expesne, total income, balance, 
                each transactions with categories and details*/}
                <DetailsInfo dataToRenderExpense={dataToRenderExpense} dataToRenderIncome={dataToRenderIncome} dataToRenderAll={dataToRenderAll} active={active} loadingRender={loadingRender} errorRender={errorRender} hasIncomeFilter={hasIncomeFilter} hasExpenseFilter = {hasExpenseFilter}/> 
            </nav>

            {openCreate && (
            <CreateTransactionModal
                onClose={() => setOpenCreate(false)}
                onSave={handleUpdate}
            />
            )}
        </div>
    );
}

export default Details;