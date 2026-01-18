import { useState } from "react";
import DateBetween from "../inputs/InputDateBetween";
import SubmitButton from "../buttons/SubmitButton";

function FormDateBetween({ onSubmit, loading, onReset, isFiltered }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Please select the range");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after end date");
      return;
    }

    onSubmit({
      start_date: startDate,
      end_date: endDate,
    });
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-6">
      <DateBetween
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <SubmitButton loading={loading} />

      {isFiltered && (
        <button
          type="button"
          onClick={handleReset}
          className="text-sm px-4 py-2 border border-gray-400 rounded-full
                     hover:bg-gray-100 transition"
        >
          Reset
        </button>
      )}
    </form>
  );
}

export default FormDateBetween;
