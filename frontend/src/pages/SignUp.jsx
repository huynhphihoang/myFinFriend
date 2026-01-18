import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
  if (session) {
    navigate("/"); 
  }
}, [session, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) alert(error.message);

    setLoading(false);
  };

  return (
    <div className="relative h-screen flex items-center justify-center font-manrope">
      {/* Auth card */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-300 rounded-lg shadow-xl">
        <h1 className="text-3xl text-white font-bold my-6 text-center">
          {isSignUp ? "Sign Up" : "Log In"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 p-6">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-lg"
          />

          <button
            disabled={loading}
            className="rounded-full p-2 text-white border border-white
              hover:bg-white hover:text-black transition"
          >
            {loading
              ? "Loading..."
              : isSignUp
              ? "Create Account"
              : "Log In"}
          </button>

          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-white underline"
          >
            {isSignUp
              ? "Already have an account? Log in"
              : "Don't have an account? Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}
