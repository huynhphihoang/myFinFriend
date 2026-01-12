
import { FaArrowRight } from "react-icons/fa";
export default function InputDateBetween({startDate, endDate, setStartDate, setEndDate}){
    return (
        <div className="flex items-end gap-6">
            {/* Start Date */}
            <div className="flex flex-col">
                <label className="text-xs text-gray-500 font-semibold mb-1">
                Start date
                </label>
                <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="text-sm font-bold border border-gray-300 rounded-lg px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {/* Arrow */}
            <FaArrowRight className="mb-3 text-gray-400" />

            {/* End Date */}
            <div className="flex flex-col">
                <label className="text-xs text-gray-500 font-semibold mb-1">
                End date
                </label>
                <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="text-sm font-bold border border-gray-300 rounded-lg px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>
        </div>
    );
}
