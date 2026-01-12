import { useState } from "react";
import DateBetween from "../inputs/InputDateBetween";
import SubmitButton from "../buttons/SubmitButton";

function FormDateBetween({fetchTotalDateRange}){
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
            start_date: startDate,
            end_date: endDate,
            };

        try {
            await fetchTotalDateRange(payload);
        } catch(error) {
            console.error("Error fetch the frequency:", error);
        }
    }
    return(
        <form onSubmit={handleSubmit} className="flex items-end gap-6">
            <DateBetween startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
            <SubmitButton/>
        </form>
      
    );
}

export default FormDateBetween;