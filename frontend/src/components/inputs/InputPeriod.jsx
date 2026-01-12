

function InputPeriod({frequency, setFrequency}) {
    return(
        <div className="flex flex-col">
            <label className="text-xs text-gray-500 font-semibold mb-1">
            Period
            </label>
            <select
            className="text-sm font-bold border border-gray-300 rounded-lg px-4 py-2
            hover:bg-black hover:text-white duration-300
            focus:outline-none focus:ring-2 focus:ring-black"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            >
                <option value="" name="blank">Select frequency</option>
                <option value="Monthly" name="monthly">Monthly</option>
                <option value="Quarterly" name="quarterly">Quarterly</option>
                <option value="Weekly" name="weekly">Weekly</option>
            </select>
        </div>
    );
}

export default InputPeriod;