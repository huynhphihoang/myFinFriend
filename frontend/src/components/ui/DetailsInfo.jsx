import Income from "../toggle/Income";
import Usage from "../toggle/Usage";
import AllTransaction from "../toggle/AllTransaction";
import Loading from "../animations/Loading";

export default function DetailsInfo({dataToRenderExpense, dataToRenderIncome, dataToRenderAll, active, loadingRender, errorRender, hasIncomeFilter,hasExpenseFilter}){

    return(
        <div>
            {errorRender ? (<div className="text-rose-700 text-xl mt-4">There is an error. Please contact to IT support.</div>) : (    
            <div> 
                {loadingRender ? (<Loading/>) : (
                        <div> 
                            {active == "income" && (
                        <Income transaction={dataToRenderIncome} hasExpenseFilter={hasExpenseFilter} hasIncomeFilter={hasIncomeFilter}/>
                    )} 
                    
                    {active == "expense" && (                 
                        <Usage transaction={dataToRenderExpense} hasExpenseFilter={hasExpenseFilter} hasIncomeFilter={hasIncomeFilter}/>
                    )}
                {active == "all" && (                 
                        <AllTransaction transaction={dataToRenderAll} hasExpenseFilter={hasExpenseFilter} hasIncomeFilter={hasIncomeFilter}/>
                    )}
                        </div>)}
                
            </div>)}
           
        </div>
    );
}