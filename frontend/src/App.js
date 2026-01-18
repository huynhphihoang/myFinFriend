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
  const { user, loading, isLoggingIn, authReady } = useAuth();

  return (
    <div>
     <Router>
      <LogoBar user={user} loading={loading} isLoggingIn={isLoggingIn}/>
      <Routes>
          <Route
            path="/"
            element={
            <Dashboard user={user} authReady={authReady}/>
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
            <SignUp/>
            }>
          </Route>

          <Route
            path="/profile"
            element={
            <Profile user={user} loading={loading}/>
            }>
          </Route>
      </Routes>
       <ToastContainer position="top-right" autoClose={2000} />
     </Router>
    </div>
  );
}

export default App;
