import { IoIosArrowDown } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import {useState} from "react";

function Usage() {
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
            className={`flex items-center justify-between shadow-lg font-bold mt-3 mx-4 gap-2 border border-black rounded-lg px-5 py-3 bg-red-400 
            hover:bg-red-700 hover:text-white duration-500 transition-full ${isOpen && "bg-red-700 text-white"}`}>
            <h3 className="px-4"> Usage </h3>
            <div className="flex items-center px-4 gap-4">
                <p name="cash"> $110 </p>
                <IoIosArrowDown className="text-xl"/>
            </div>
        </nav>

        <nav className="flex justify-center">
        {isOpen && (
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
                    <tr className="border-b border-gray-400 hover:bg-gray-50">
                        <td className="px-4 py-3">2025-01-10</td>
                        <td className="px-4 py-3">Food</td>
                        <td className="px-4 py-3">Korean Food</td>
                        <td className="px-4 py-3 text-green-600 font-bold text-right">
                            -$102.50
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex justify-end">
                            <BsThreeDotsVertical className="text-gray-500 hover:text-black cursor-pointer" />
                            </div>
                        </td>
                    </tr>

                    <tr className="border-b border-gray-400 hover:bg-gray-50">
                        <td className="px-4 py-3">2025-01-10</td>
                        <td className="px-4 py-3">Drink</td>
                        <td className="px-4 py-3">Beer</td>
                        <td className="px-4 py-3 text-green-600 font-bold text-right">
                            -$102.50
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
        </nav>
        </div>
    );
}

export default Usage;
