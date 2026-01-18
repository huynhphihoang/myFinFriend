import { useState } from "react";
import InputPeriod from "../inputs/InputPeriod";
import InputDateBetween from "../inputs/InputDateBetween";
import SubmitButton from "../buttons/SubmitButton";

function FormDateFrequency({fetchFrequency, setFrequencyPayLoad, onSubmitStart, loading}){
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
        onSubmitStart();
        try {
            fetchFrequency(payload)
            setFrequencyPayLoad(payload)
        } catch (error) {
        console.error("Error fetch the frequency:", error);
        }
    }

    return(
        <form onSubmit={handleSubmit} className="flex items-end gap-6">
            <InputPeriod frequency={frequency} setFrequency={setFrequency}/>
            <InputDateBetween startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>
            <SubmitButton loading={loading}/>
        </form> 
    );
}

export default FormDateFrequency;