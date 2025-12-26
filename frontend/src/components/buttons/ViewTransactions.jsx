import { FaArrowRight } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import {Link} from "react-router-dom";

function ViewTransactions() {
    return(
    <Link to="/details" className="flex items-center shadow-lg font-manrope font-bold gap-2 border border-black 
    rounded-full px-5 py-3 hover:bg-black hover:text-white hover:-translate-y-0.5 duration-500 transition-full"> 
        <TiDocumentText className="text-xl"/> 
        View Transactions
        <FaArrowRight className="text-xl"/> 
    </Link>
    );
}

export default ViewTransactions;