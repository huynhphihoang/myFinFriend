import UploadFile from "../components/buttons/UploadFile"
import ViewTransactions from "../components/buttons/ViewTransactions";
import BarChart from "../components/charts/BarChart";
import CircleChart from "../components/charts/CircleChart";
import InfoBoxes from "../components/ui/InfoBoxes";

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
            {/* Input on top-left */}
            <select className="text-xs border border-black font-bold tracking-wide rounded-full px-3 py-1 mb-3 hover:bg-black hover:text-white duration-500 transition-full">
              <option value="monthly">Monthly</option>
            </select>

            {/* Info boxes */}
            <InfoBoxes/>

            {/*Insights | Advices from AI */}
            <div className="bg-yellow-100 mt-4 shadow-lg rounded-sm" name="insights">
              <p className="p-2"> Insights: You’re spend overwhelm your allowance. Consider to save some money. </p>
            </div>

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