

function PeriodInput() {
    return(
        <div className="flex flex-col">
            <label className="text-xs text-gray-500 font-semibold mb-1">
            Period
            </label>
            <select
            className="text-sm font-bold border border-gray-300 rounded-lg px-4 py-2
            hover:bg-black hover:text-white duration-300
            focus:outline-none focus:ring-2 focus:ring-black"
            >
            <option value="monthly">Monthly</option>
            </select>
        </div>
    );
}

export default PeriodInput;