import { BsThreeDotsVertical } from "react-icons/bs";

function Income({transaction, loading, error, hasExpenseFilter, hasIncomeFilter}) {

    if (error) {
        return <div className="text-center mt-5 text-red-500">Error: {error}</div>;
    }

    return(
        <div>
            <div className="flex justify-center">
            {loading ? (
                <div className="text-rose-700 text-xl mt-4"> Loading the transactions...</div>
                ) 
                : (
                <table className="w-full mt-4 border border-black border-black font-manrope rounded-xl overflow-hidden text-center text-white table-fixed bg-gray-500">
                    <thead className="border-b border-gray-400 bg-gray-700">
                        <tr>
                            <th className="px-4 py-2"> {hasExpenseFilter || hasIncomeFilter ? ("Period") : ("Date")} </th>
                            {!(hasExpenseFilter || hasIncomeFilter) && (<th className="px-4 py-2">Category</th>)}
                            {!(hasExpenseFilter || hasIncomeFilter) && (<th className="px-4 py-2">Description</th>)}
                            <th className="px-4 py-2 text-right">Amount ($)</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {transaction.filter((cat) => cat['transaction_amount'] > 0).map((cat) => (
                        
                        <tr key={cat["transaction_id"]} className="border-b border-gray-400 hover:bg-gray-50 hover:text-black">
                            <td className="px-4 py-3">{cat['transaction_date']}</td>
                            {!(hasExpenseFilter || hasIncomeFilter) && (<td className="px-4 py-3">{cat['category_name']  || "Uncategorized"}</td>)}
                            {!(hasExpenseFilter || hasIncomeFilter) && (<td className="px-4 py-3">{cat['transaction_details']}</td>)}
                            <td className="px-4 py-3 text-green-400 font-bold text-right">
                                +{cat['transaction_amount']}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex justify-end">
                                <BsThreeDotsVertical className="text-gray-700 hover:text-black cursor-pointer" />
                                </div>
                            </td>
                        </tr>

                    ))}
                    </tbody>
                </table>
            )}
            </div>
        </div>
    );
}

export default Income;