import {Link} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FormDateFrequency from "../components/forms/FormDateFrequency";
import DetailsInfo from "../components/ui/DetailsInfo";
import ToggleChange from "../components/toggle/ToggleChange";
import { useExpenseFrequency } from "../hooks/useExpenseFrenquency";

function Details() {
    const { fetchFrequency, expenseData, incomeData, loading, error } = useExpenseFrequency();
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
                <FormDateFrequency fetchFrequency={fetchFrequency}/>
            </div>
            <ToggleChange/>
            
            {/* Details information including total expesne, total income, balance, 
            each transactions with categories and details*/}
            <DetailsInfo expenseData={expenseData} incomeData={incomeData}/>
        </div>
    );
}

export default Details;