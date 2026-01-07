import { useTransactionSummary } from "../../hooks/useTransactionSummary";

function InfoBoxes() {
    const { transactionSummary, loadingSummary, errorSummary } = useTransactionSummary();
    return(
        <div className="flex gap-4 text-white">
            <div className="flex-1 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg">
                <p className="text-center text-sm font-bold opacity-80 pt-2">
                    Income
                </p>
                <p className="text-center text-2xl font-bold py-4">
                    ${transactionSummary['total_income'] || "----"}
                </p>
            </div>

            <div className="flex-1 bg-gradient-to-br from-red-400 to-red-700 rounded-2xl shadow-lg">
                <p className="text-center text-sm font-bold opacity-80 pt-2">
                    Usage
                </p>
                <p className="text-center text-2xl font-bold py-4">
                    ${transactionSummary['total_expense'] || "----"}
                </p>
            </div>

            <div className="flex-1 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl shadow-lg">
                <p className="text-center text-sm font-bold opacity-80 pt-2">
                    Total Cash Balance
                </p>
                <p className="text-center text-2xl font-bold py-4">
                    ${transactionSummary['balance'] || "----"}
                </p>
            </div>
        </div>
    );
}

export default InfoBoxes;