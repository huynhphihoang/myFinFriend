import UploadFile from "../components/inputs/UploadFile"
import ViewTransactions from "../components/buttons/ViewTransactions";
import BarChart from "../components/charts/BarChart";
import CircleChart from "../components/charts/CircleChart";
import InfoBoxes from "../components/ui/InfoBoxes";
import InsightAI from "../components/ui/InsightAi";
import FormDateBetween from "../components/forms/FormDateBetween";
import {useDateRange} from "../hooks/useDateRange"
import { useTransactionSummary } from "../hooks/useTransactionSummary";
import Loading from "../components/animations/Loading";
import {useState, useEffect} from "react";

function Dashboard() {
    const { fetchTotalDateRange, totalIncome, totalExpense, categories, loading, error } = useDateRange();
    const { transactionSummary, loadingSummary, errorSummary } = useTransactionSummary();
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const loadingRender = hasSubmitted ? loading : loadingSummary;
    const errorRender = hasSubmitted ? error : errorSummary;

    // Revert back after submit completes
    useEffect(() => {
      if (!loading && hasSubmitted) {
        setHasSubmitted(false);
      }
    }, [loading]);

    // Determine which data to show the total expense
    const dataToRenderExpense =
    totalExpense && totalExpense.length == 0
        ? transactionSummary  
        : totalExpense

    // Determine which data to show the total total
    const dataToRenderIncome =
    totalIncome && totalIncome.length == 0
        ? transactionSummary
        : totalIncome
    
    // Calculated the total balance.
    const balance = dataToRenderIncome.total_income + dataToRenderExpense.total_expense;

    return (
        <nav className="font-manrope">
          <h2 className="text-center font-bold text-3xl mt-4">
            Dashboard
          </h2>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-3">
            <UploadFile/>
            <ViewTransactions/>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-start my-4">
              <div className="flex items-end gap-6">
                <FormDateBetween fetchTotalDateRange={fetchTotalDateRange} onSubmitStart={() => setHasSubmitted(true)} loading={loadingRender}/>
              </div>
            </div>
          {errorRender ? (<div className="text-rose-700 text-xl mt-4"> 
            There is an error. Please contact to IT support.
          </div>) : (
            <div>
              {loadingRender ? (<Loading/>) : (
                <div>
                <div>
                {/* Information demonstration */}


                {/* Info boxes */}
                <InfoBoxes dataToRenderIncome={dataToRenderIncome} dataToRenderExpense={dataToRenderExpense} balance={balance}/>

                {/*Insights | Advices from AI */}
                <InsightAI/>

              </div>

              {/* Charts */}
              <div className="flex justify-center gap-4 max-w-5xl mx-auto mt-4">
                {/* Bar chart → 1/3 */}
                <BarChart categories={categories}/>
                {/* Circle chart → 2/3 */}
                <CircleChart dataToRenderIncome={dataToRenderIncome} dataToRenderExpense={dataToRenderExpense} balance={balance}/>
              </div>
              </div>
              )}
                </div>
              )}
         </div>
      </nav>
    );
}

export default Dashboard;