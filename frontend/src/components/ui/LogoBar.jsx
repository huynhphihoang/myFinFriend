import { IoNotificationsOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import LogInButton from "../buttons/LogInButton";
import {Link} from "react-router-dom"
import SignUpButton from "../buttons/SignUpButton";
import { useState, useEffect,useRef } from "react";
import { GoDotFill } from "react-icons/go";
import { PiExclamationMarkFill } from "react-icons/pi";

import { useTransaction } from "../../hooks/useTransactions";
function LogoBar ({isLoggingIn, isSignUp, setIsSignUp}) {
    const {transaction, loadingTransaction, errorTransaction} = useTransaction();
    const [showNotifications, setShowNotifications] = useState(false);
    const [countOther, setCountOther] = useState(0);

    useEffect(() => {
        const count = transaction.filter(
            t => t.category_name === "Other"
            ).length;

        setCountOther(count);
    },[transaction])
  
    return(
        <div>
            <div className='flex justify-between m-4'>
                <h1 className="font-manrope font-bold text-3xl font-bold opacity-70 tracking-widest">
                    <Link to="/">
                        myFinFriend
                    </Link>
                </h1>
                {isLoggingIn===true ? (   
                    <div className="flex gap-4 items-center">            
                        <div className="relative">
                            <IoNotificationsOutline
                                className="text-xl cursor-pointer hover:text-gray-700 hover:animate-ring origin-top"
                                onClick={() => setShowNotifications(prev => !prev)}
                            />

                            {countOther > 0 && (
                                <GoDotFill className="absolute -top-1 -right-1 text-red-500 text-xs" />
                            )}
                        </div>
                        
                        {showNotifications && (
                            <div className="absolute right-8 top-8 mt-4 w-90 rounded-xl bg-white shadow-xl border border-gray-200 z-50">
                            <div className="px-4 py-2 font-semibold text-sm border-b">
                                Notifications
                            </div>
                            <ul className="max-h-60 overflow-y-auto">
                                {countOther > 0 ? ( 
                                <li className="flex gap-2 items-center px-4 py-3 text-center text-sm hover:bg-gray-100 cursor-pointer">
                                    <PiExclamationMarkFill className="text-rose-500"/>You have {countOther} transactions categorized as “Other”.
                                </li>) : (
                                <li className="px-8 py-4 text-center text-sm hover:bg-gray-100 cursor-pointer">
                                    There is no notifications.
                                </li>
                                )}
                               
                            </ul>
                            </div>
                        )}

                     
                        <div>
                            <Link to="/profile" className="bg-black">
                                <RxAvatar className="text-xl hover:text-gray-700"/>  
                            </Link> 
                        </div>
                              
                    </div> ) : (
                    <div className="flex w-64 rounded-full bg-gray-200 p-1 shadow-inner">
                        <LogInButton isSignUp={isSignUp} setIsSignUp={setIsSignUp}/> 
                        <SignUpButton isSignUp={isSignUp} setIsSignUp={setIsSignUp}/> 
                    </div>
                )}
            </div>
            <hr className='border-t-2'/>
        </div>
    );
}

export default LogoBar;