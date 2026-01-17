import LogoBar from "./components/ui/LogoBar"
import Dashboard from "./pages/Dashboard"
import Details from "./pages/Details"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import { useAuth } from "./hooks/useAuth";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './index.css';

function App() {
  const { user, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoggingOut(true);
    }
  }) 
  return (
    <div>
     <Router>
      <LogoBar user={user} loading={loading} isLoggingOut={isLoggingOut}/>
      <Routes>
          <Route
            path="/"
            element={
            <Dashboard user={user}/>
            }>
          </Route>
          
          <Route
            path="/details"
            element={
            <Details/>
            }>
          </Route>

          <Route
            path="/signup"
            element={
            <SignUp setIsLoggingOut={setIsLoggingOut}/>
            }>
          </Route>

          <Route
            path="/profile"
            element={
            <Profile user={user} loading={loading} isLoggingOut={isLoggingOut} setIsLoggingOut={setIsLoggingOut}/>
            }>
          </Route>
      </Routes>
       <ToastContainer position="top-right" autoClose={2000} />
     </Router>
    </div>
  );
}

export default App;
