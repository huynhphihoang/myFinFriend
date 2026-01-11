import Allowance from "../toggle/Allowance";
import Usage from "../toggle/Usage";
import { IoIosArrowDown } from "react-icons/io";
import { useTransactionSummary } from "../../hooks/useTransactionSummary";
import { useTransaction } from "../../hooks/useTransactions";

export default function DetailsInfo({expenseData, incomeData}){
    console.log(incomeData)
    const { transaction, loading, error } = useTransaction();
    const dataToRenderExpense =
    expenseData && expenseData.length > 0
        ? expenseData     
        : transaction
    
    const dataToRenderIncome =
    incomeData && incomeData.length > 0
        ? incomeData     
        : transaction

    const { transactionSummary, loadingSummary, errorSummary } = useTransactionSummary();

    return(
        <div>
            <Allowance transactionSummary={transactionSummary} loadingSummary={loadingSummary} errorSummary={errorSummary} transaction={dataToRenderIncome} loading={loading} error={error}/>

            <Usage transactionSummary={transactionSummary} loadingSummary={loadingSummary} errorSummary={errorSummary} transaction={dataToRenderExpense} loading={loading} error={error}/>

            <nav className="flex items-center justify-between shadow-lg font-bold gap-2 mt-3 mx-4 border border-black rounded-lg px-5 py-3 bg-gray-300">
                <h3 className="px-4"> Previous </h3>
                <div className="flex items-center px-4 gap-4">
                    <p name="cash"> $300 </p>
                    <IoIosArrowDown className="text-xl opacity-0"/>
                </div>
            </nav>

            <hr className="border-t-2 mt-4 mx-4 border-black"/>

            <nav className="flex items-center justify-end font-bold mt-3 mx-4 px-8 py-3 gap-2">
                <h3>Cash Balance:</h3>

                <div className="flex items-center px-4 gap-2">
                    <p>${transactionSummary['balance']}</p>
                    <IoIosArrowDown className="text-xl opacity-0"/>
                </div>
            </nav>
        </div>
    );
}