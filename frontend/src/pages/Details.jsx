import {Link} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Allowance from "../components/toggle/Allowance";
import Usage from "../components/toggle/Usage";

function Details() {
    return (
        <div className="font-manrope">
            <div className="flex items-center my-5 relative">
                {/* Back button (left) */}
                <Link to="/" className="ml-3">
                    <button className="text-sm flex items-center shadow-lg font-bold gap-2 border border-black rounded-full px-5 py-3 hover:bg-black hover:text-white transition duration-500">
                    <FaArrowLeft />
                    Back to the dashboard
                    </button>
                </Link>

                {/* Center title */}
                <h2 className="absolute left-1/2 -translate-x-1/2 font-bold text-2xl">
                Transaction Details
                </h2>
            </div>

            <Allowance/>

            <Usage/>

            <nav className="flex items-center justify-between shadow-lg font-bold gap-2 mt-3 mx-4 border border-black rounded-full px-5 py-3 bg-gray-300">
                <h3 className="px-4"> Previous </h3>
                <div className="flex items-center px-4 gap-4">
                    <p name="cash"> $300 </p>
                    <IoIosArrowDown className="text-xl opacity-0"/>
                </div>
            </nav>

            <hr className="border-t-2 mt-4 mx-4 border-black"/>

            <nav className="flex items-center justify-end font-bold mt-3 mx-4 px-8 py-3 gap-2">
                <h3>Cash Balance:</h3>

                <div className="flex items-center px-4 gap-2">
                    <p>$392.5</p>
                    <IoIosArrowDown className="text-xl opacity-0"/>
                </div>
            </nav>
        </div>
    );
}

export default Details;