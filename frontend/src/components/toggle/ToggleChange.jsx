import { useState } from "react";

function ToggleChange() {
    const [active, setActive] = useState("all");

    const base =
    "flex-1 text-center py-2 rounded-md cursor-pointer transition duration-300";
    
    return(
    <div className="flex justify-end mx-4">
    <div className="flex w-2/6 border border-black rounded-lg p-1 gap-1">
        
        <button
        onClick={() => setActive("income")}
        className={`${base} ${
            active === "income"
            ? "bg-green-700 text-white"
            : "hover:bg-green-600 hover:text-white"
        }`}
        >
        Income
        </button>

        <button
        onClick={() => setActive("expense")}
        className={`${base} ${
            active === "expense"
            ? "bg-rose-700 text-white"
            : "hover:bg-rose-600 hover:text-white"
        }`}
        >
        Expense
        </button>

        <button
        onClick={() => setActive("all")}
        className={`${base} ${
            active === "all"
            ? "bg-gray-700 text-white"
            : "hover:bg-gray-600 hover:text-white"
        }`}
        >
        All
        </button>

    </div>
    </div>
    );
}

export default ToggleChange;