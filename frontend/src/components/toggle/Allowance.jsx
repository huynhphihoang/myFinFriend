import { IoIosArrowDown } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import {useState} from "react";
function Allowance() {

    const [isOpen,setIsOpen] = useState(false);

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
            className={`flex items-center justify-between shadow-lg font-bold mt-3 mx-4 gap-2 border border-black rounded-full px-5 py-3 bg-green-400 
            hover:bg-green-700 hover:text-white duration-500 transition-full ${isOpen && "bg-green-700 text-white"}`}>
            <h3 className="px-4"> Allowance </h3>
            <div className="flex items-center px-4 gap-4">
                <p name="cash"> $202.50 </p>
                <IoIosArrowDown className="text-xl"/>
            </div>
        </nav>

        {isOpen && (
            <table className="w-full mt-4 border border-black border-black font-manrope rounded-xl overflow-hidden text-center">
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
                    <tr className="border-b border-gray-400 hover:bg-gray-50">
                        <td className="px-4 py-3">2025-01-10</td>
                        <td className="px-4 py-3">Income</td>
                        <td className="px-4 py-3">Investment</td>
                        <td className="px-4 py-3 text-green-600 font-bold text-right">
                            +$102.50
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex justify-end">
                            <BsThreeDotsVertical className="text-gray-500 hover:text-black cursor-pointer" />
                            </div>
                        </td>
                    </tr>

                    <tr className="border-b border-gray-400 hover:bg-gray-50">
                        <td className="px-4 py-3">2025-01-10</td>
                        <td className="px-4 py-3">Income</td>
                        <td className="px-4 py-3">Investment</td>
                        <td className="px-4 py-3 text-green-600 font-bold text-right">
                            +$102.50
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex justify-end">
                            <BsThreeDotsVertical className="text-gray-500 hover:text-black cursor-pointer" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        )}
        </div>
    );
}

export default Allowance;