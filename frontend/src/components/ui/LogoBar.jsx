import { IoNotificationsOutline } from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth";
import LogInButton from "../buttons/LogInButton";
import {Link} from "react-router-dom"

function LogoBar () {
    const { user, loading } = useAuth();

    return(
        <div>
            <div className='flex justify-between m-4'>
                <h1 className="font-manrope font-bold text-3xl font-bold opacity-70 tracking-widest">
                    <Link to="/">
                        myFinFriend
                    </Link>
                </h1>
                {!loading && user ? (                    
                    <IoNotificationsOutline
                    className="text-xl cursor-pointer hover:text-gray-700
                    hover:animate-ring origin-top"
                    />) : (
                    <LogInButton/>
                )}
            </div>
            <hr className='border-t-2'/>
        </div>
    );
}

export default LogoBar;