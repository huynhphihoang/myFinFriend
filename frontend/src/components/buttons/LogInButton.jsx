import {Link} from "react-router-dom"

export default function LogInButton() {
    return(
        <div className="flex justify-center px-4 py-1 mx-4 rounded-full hover:-translate-y-1 text-white bg-gradient-to-br from-blue-400 to-blue-600 shadow-3xl duration-500 transition-full"> 
            <Link to="/signup">
                Log In
            </Link>
        </div>
    );
}