import { RxAvatar } from "react-icons/rx";
import {Link} from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile(){
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const handleLogout = async () => {
        await supabase.auth.signOut();
        alert("Successfully sign out");
    };

      useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);


    if (session===null) {
        navigate("/signup"); 
    }

    return(
        <div className="h-screen">
            <div className="flex justify-center mt-4">
            <RxAvatar className="text-6xl"/>
            </div>

            <div className="flex justify-center mt-8">
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

                    <button className="hover:bg-rose-600 hover:text-white text-red-600 w-full rounded-lg py-4" onClick={handleLogout}> Log out </button>
                </div>
            </div>
        </div>
    );
}