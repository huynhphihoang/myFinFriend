import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

function InputDate({fetchFrequency}){
    const [frequency, setFrequency] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (new Date(startDate) > new Date(endDate)) {
            alert("Start date cannot be after end date");
            return;
        }

        if (!startDate || !endDate) {
            alert("Please select the range");
            return;
        }

        const payload = {
            frequency,
            start_date: startDate,
            end_date: endDate,
            };

        try {
            fetchFrequency(payload)
        } catch (error) {
        console.error("Error fetch the frequency:", error);
    }
    }
    return(
        <form onSubmit={handleSubmit} className="flex items-end gap-6">
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
            <button type="submit" className="rounded-full border border-black px-6 py-2 hover:bg-black hover:text-white">
                Submit
            </button>
        </form>
      
    );
}

export default InputDate;