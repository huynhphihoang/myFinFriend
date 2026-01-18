import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
      setAuthReady(true);
    });

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setIsLoggingIn(!!session);
        setAuthReady(true);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return { user, loading, isLoggingIn, authReady};
}
