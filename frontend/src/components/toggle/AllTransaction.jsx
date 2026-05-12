import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


export default function AllTransaction({transaction, hasExpenseFilter, hasIncomeFilter, handleEdit, handleDelete}) {
    return(
        <div>
            <div className="flex justify-center">
                <table className="w-full mt-4 border border-black border-black font-manrope rounded-xl overflow-hidden text-center text-white table-fixed bg-gray-500">
                    <thead className="border-b border-gray-400 bg-gray-700">
                        <tr>
                            <th className="px-4 py-2"> {hasExpenseFilter || hasIncomeFilter ? ("Period") : ("Date")}</th>
                            {!(hasExpenseFilter || hasIncomeFilter) && (<th className="px-4 py-2">Category</th>)}
                            {!(hasExpenseFilter || hasIncomeFilter) && (<th className="px-4 py-2">Description</th>)}
                            <th className="px-4 py-2 text-right">Amount ($)</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {transaction.map((cat) => (
                        
                        <tr key={cat["transaction_id"]} className="border-b border-gray-400 hover:bg-gray-50 hover:text-black">
                            <td className="px-4 py-3">{cat['transaction_date']}</td>
                            {!(hasExpenseFilter || hasIncomeFilter) && (<td className="px-4 py-3">{cat['category_name']  || "Uncategorized"}</td>)}
                            {!(hasExpenseFilter || hasIncomeFilter) && (<td className="px-4 py-3">{cat['transaction_details']}</td>)}
                            <td className={`px-4 py-3 ${cat['transaction_amount'] > 0 ? ('text-green-400') : ('text-red-500')} font-bold text-right`}>
                                {cat['transaction_amount'] > 0 ? ("+") : ("")}{cat['transaction_amount']}
                            </td>
                            <td className="px-4 py-3">
                                 <div className="flex justify-end gap-3">
                                    <button onClick={() => handleDelete(cat.transaction_id)}>
                                        <MdDelete className="text-rose-400 hover:text-rose-700 cursor-pointer"/>
                                    </button>
                                    <button onClick={() => handleEdit(cat)}>
                                        <FaEdit className="text-blue-400 hover:text-blue-700 cursor-pointer" />
                                    </button>
                                </div>
                            </td>
                        </tr>

                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}