import "../index.css";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import {Link} from "react-router-dom"
import { supabase } from "../supabaseClient";

export default function LogIn() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [session, setSession] = useState(null);

    // Check URL params on initial render
    const params = new URLSearchParams(window.location.search);
    const hasTokenHash = params.get("token_hash");

    const [verifying, setVerifying] = useState(!!hasTokenHash);
    const [authError, setAuthError] = useState(null);
    const [authSuccess, setAuthSuccess] = useState(false);

    useEffect(() => {
        // Check if we have token_hash in URL (magic link callback)
        const params = new URLSearchParams(window.location.search);
        const token_hash = params.get("token_hash");
        const type = params.get("type");

        if (token_hash) {
            // Verify the OTP token
            supabase.auth.verifyOtp({
                token_hash,
                type: type || "email",
            }).then(({ error }) => {
                if (error) {
                    setAuthError(error.message);
                } else {
                    setAuthSuccess(true);
                    // Clear URL params
                    window.history.replaceState({}, document.title, "/");
                }
                setVerifying(false);
            });
        }

        // Check for existing session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: window.location.origin,
            }
        });
        if (error) {
            alert(error.error_description || error.message);
        } else {
            alert("Check your email for the login link!");
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    // Show verification state
    if (verifying) {
        return (
            <div>
                <h1>Authentication</h1>
                <p>Confirming your magic link...</p>
                <p>Loading...</p>
            </div>
        );
    }

    // Show auth error
    if (authError) {
        return (
            <div>
                <h1>Authentication</h1>
                <p>✗ Authentication failed</p>
                <p>{authError}</p>
                <button
                    onClick={() => {
                        setAuthError(null);
                        window.history.replaceState({}, document.title, "/");
                    }}
                >
                    Return to login
                </button>
            </div>
        );
    }

    // Show auth success (briefly before session loads)
    if (authSuccess && !session) {
        return (
            <div>
                <h1>Authentication</h1>
                <p>✓ Authentication successful!</p>
                <p>Loading your account...</p>
            </div>
        );
    }

    // If user is logged in, show welcome screen
    if (session) {
        return (
            <div>
                <h1>Welcome!</h1>
                <p>You are logged in as: {session.user.email}</p>
                <button onClick={handleLogout}>
                    Sign Out
                </button>
            </div>
        );
    }

    // Show login form
    return (
        <div className="flex font-manrope relative text-center items-center justify-center w-auto h-screen">
            {/* Back button (left) */}
            <div className="absolute left-6 top-6">
                <Link to="/" className="ml-3">
                    <button className="text-sm flex items-center shadow-lg font-bold gap-2 border border-black rounded-full px-5 py-3 hover:bg-black hover:text-white transition duration-500">
                    <FaArrowLeft />
                    Back to the dashboard
                    </button>
                </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-700 to-blue-300 rounded-lg">
                <h1 className="text-3xl text-white font-bold my-6">Log In</h1>

                <div className="flex justify-center">
                    <form onSubmit={handleLogin} className="flex flex-col gap-6 w-80 p-6">
                        <input
                            type="email"
                            placeholder="Your email"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 mx-4 rounded-lg"
                        />
                        <button disabled={loading} className="rounded-full p-2 m-4 text-white hover:bg-white hover:text-black duration-500 transition-full">
                            {loading ? <span>Loading</span> : <span>Send magic link</span>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}