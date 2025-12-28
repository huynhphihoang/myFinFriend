import UploadFile from "../components/buttons/UploadFile"
import ViewTransactions from "../components/buttons/ViewTransactions";
import BarChart from "../components/charts/BarChart";
import CircleChart from "../components/charts/CircleChart";
import InfoBoxes from "../components/ui/InfoBoxes";
import PeriodInput from "../components/inputs/PeriodInput";
import InputDate from "../components/inputs/InputDate";
import InsightAI from "../components/ui/InsightAi";

function Dashboard() {
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
                {/* Monthly selector (left) */}
                <PeriodInput/>

                {/*Date between selectors*/}
                <InputDate/>
              </div>
            </div>

            {/* Info boxes */}
            <InfoBoxes/>

            {/*Insights | Advices from AI */}
            <InsightAI/>

          </div>

          {/* Charts */}
          <div className="flex justify-center gap-4 max-w-5xl mx-auto mt-4">
            {/* Bar chart → 1/3 */}
            <BarChart/>
            {/* Circle chart → 2/3 */}
            <CircleChart/>
          </div>
      </nav>
    );
}

export default Dashboard;