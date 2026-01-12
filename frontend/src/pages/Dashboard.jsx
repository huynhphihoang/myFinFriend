import UploadFile from "../components/inputs/UploadFile"
import ViewTransactions from "../components/buttons/ViewTransactions";
import BarChart from "../components/charts/BarChart";
import CircleChart from "../components/charts/CircleChart";
import InfoBoxes from "../components/ui/InfoBoxes";
import InsightAI from "../components/ui/InsightAi";
import FormDateBetween from "../components/forms/FormDateBetween";
import {useDateRange} from "../hooks/useDateRange"
import { useTransactionSummary } from "../hooks/useTransactionSummary";

function Dashboard() {
    const { fetchTotalDateRange, totalIncome, totalExpense, loading, error } = useDateRange();
    const { transactionSummary, loadingSummary, errorSummary } = useTransactionSummary();

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

          {/* Information demonstration */}
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-start my-4">
              <div className="flex items-end gap-6">
                <FormDateBetween fetchTotalDateRange={fetchTotalDateRange}/>
              </div>
            </div>

            {/* Info boxes */}
            <InfoBoxes dataToRenderIncome={dataToRenderIncome} dataToRenderExpense={dataToRenderExpense} balance={balance}/>

            {/*Insights | Advices from AI */}
            <InsightAI/>

          </div>

          {/* Charts */}
          <div className="flex justify-center gap-4 max-w-5xl mx-auto mt-4">
            {/* Bar chart → 1/3 */}
            <BarChart/>
            {/* Circle chart → 2/3 */}
            <CircleChart dataToRenderIncome={dataToRenderIncome} dataToRenderExpense={dataToRenderExpense} balance={balance}/>
          </div>
      </nav>
    );
}

export default Dashboard;