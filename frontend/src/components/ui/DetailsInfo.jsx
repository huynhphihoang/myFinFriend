import Income from "../toggle/Income";
import Usage from "../toggle/Usage";
import { useTransaction } from "../../hooks/useTransactions";
import AllTransaction from "../toggle/AllTransaction";

export default function DetailsInfo({expenseData, incomeData, active}){
    console.log(incomeData)
    const { transaction, loading, error } = useTransaction();
    const hasIncomeFilter = incomeData?.length > 0;
    const hasExpenseFilter = expenseData?.length > 0;

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
    return(
        <div>
            {active == "income" && (
                <Income transaction={dataToRenderIncome} loading={loading} error={error} hasExpenseFilter={hasExpenseFilter} hasIncomeFilter={hasIncomeFilter}/>
            )} 
            
            {active == "expense" && (                 
                <Usage transaction={dataToRenderExpense} loading={loading} error={error}  hasExpenseFilter={hasExpenseFilter} hasIncomeFilter={hasIncomeFilter}/>
            )}
           {active == "all" && (                 
                <AllTransaction transaction={dataToRenderAll} loading={loading} error={error}  hasExpenseFilter={hasExpenseFilter} hasIncomeFilter={hasIncomeFilter}/>
            )}
        </div>
    );
}