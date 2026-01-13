import { RxAvatar } from "react-icons/rx";
import {Link} from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/animations/Loading";
import { useAuth } from "../hooks/useAuth";

export default function Profile({user,loading}){
    const navigate = useNavigate();
    useEffect(() => {
    if (loading) return; 

    if (!user) {
        navigate("/signup");
    }
    }, [user,loading, navigate]);

    return(
        <div className="h-screen">
            <div className="flex justify-center mt-4">
            <RxAvatar className="text-6xl"/>
            </div>
            <div className="text-center mt-2">
                {user.email}
            </div>
            <div className="flex justify-center mt-6">
                <div className="border border-gray-400 rounded-xl w-3/4 h-100">
                    <Link to="/"> 
                        <button className="hover:bg-gray-600 hover:text-white w-full rounded-lg border-b border-gray-400 py-4">
                            Dashboard 
                        </button> 
                    </Link>
                    
                    <Link to="/details">
                        <button className="hover:bg-gray-600 hover:text-white w-full rounded-lg border-b border-gray-400 py-4">  
                            View Transactions 
                        </button>
                    </Link>

                    <button className="hover:bg-rose-600 hover:text-white text-red-600 w-full rounded-lg py-4" > Log out </button>
                </div>
            </div>
        </div>
    );
}