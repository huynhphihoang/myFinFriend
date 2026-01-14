import { IoNotificationsOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import LogInButton from "../buttons/LogInButton";
import {Link} from "react-router-dom"

function LogoBar ({isLoggingOut}) {

    console.log(isLoggingOut)
    return(
        <div>
            <div className='flex justify-between m-4'>
                <h1 className="font-manrope font-bold text-3xl font-bold opacity-70 tracking-widest">
                    <Link to="/">
                        myFinFriend
                    </Link>
                </h1>
                {isLoggingOut===true ? (   
                    <div className="flex gap-4 items-center">            
                        <IoNotificationsOutline
                        className="text-xl cursor-pointer hover:text-gray-700
                        hover:animate-ring origin-top"
                        />
                     
                        <div>
                            <Link to="/profile" className="bg-black">
                                <RxAvatar className="text-xl hover:text-gray-700"/>  
                            </Link> 
                        </div>
                              
                    </div> ) : (
                    <LogInButton/>
                )}
            </div>
            <hr className='border-t-2'/>
        </div>
    );
}

export default LogoBar;