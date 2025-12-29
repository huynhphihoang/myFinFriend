import { IoIosArrowDown } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import {useState} from "react";
import { useTransaction } from "../../hooks/useTransactions";

function Allowance() {
    const [isOpen,setIsOpen] = useState(false);
    const { transaction, loading, error } = useTransaction();

    if (error) {
        return <div className="text-center mt-5 text-red-500">Error: {error}</div>;
    }

    const handleOpen = () => {
        if (isOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
    }
    }
    return(
        <div>
        <nav onClick={handleOpen} 
            className={`flex items-center justify-between shadow-lg font-bold mt-3 mx-4 gap-2 border border-black rounded-lg px-5 py-3 bg-green-400 
            hover:bg-green-700 hover:text-white duration-500 transition-full ${isOpen && "bg-green-700 text-white"}`}>
            <h3 className="px-4"> Allowance </h3>
            <div className="flex items-center px-4 gap-4">
                {loading ? (<p>...</p>) : (<p name="cash">  $202.50 </p>)}
                <IoIosArrowDown className="text-xl"/>
            </div>
        </nav>

        {isOpen && (
            <div className="flex justify-center">
            {loading ? (
                <div className="text-rose-700 text-xl mt-4"> Loading the transactions...</div>
                ) 
                : (
                <table className="w-5/6 mt-4 border border-black border-black font-manrope rounded-xl overflow-hidden text-center">
                    <thead className="border-b border-gray-400">
                        <tr>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2 text-right">Amount ($)</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {transaction.map((cat) => (
                        
                        <tr className="border-b border-gray-400 hover:bg-gray-50">
                            <td className="px-4 py-3">{cat['transaction_date']}</td>
                            <td className="px-4 py-3">{cat['transaction_category']}</td>
                            <td className="px-4 py-3">{cat['transaction_details']}</td>
                            <td className="px-4 py-3 text-green-600 font-bold text-right">
                                +{cat['transaction_amount']}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex justify-end">
                                <BsThreeDotsVertical className="text-gray-500 hover:text-black cursor-pointer" />
                                </div>
                            </td>
                        </tr>

                    ))}
                    </tbody>
                </table>
            )}
            </div>
        )}
        </div>
    );
}

export default Allowance;