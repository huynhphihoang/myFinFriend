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
        </div>
    );
}