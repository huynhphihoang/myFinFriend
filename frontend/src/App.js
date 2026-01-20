import LogoBar from "./components/ui/LogoBar"
import Dashboard from "./pages/Dashboard"
import Details from "./pages/Details"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import { useAuth } from "./hooks/useAuth";
import { useTransaction } from "./hooks/useTransactions"
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

  /* -------------------- hooks -------------------- */
  const { user, loading, isLoggingIn, authReady } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const { transaction, loadingTransaction, errorTransaction } = useTransaction();

  /* -------------------- state -------------------- */
  const [loadingState, setLoadingState] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true);

  /* -------------------- sync backend → state -------------------- */
  useEffect(() => {
    if (transaction) {
      setTransactions(transaction);
      setLoadingState(false);
    }

    if (errorTransaction) {
      setErrorState(errorTransaction);
      setLoadingState(false);
    }
  }, [transaction, errorTransaction]);

  return (
    <div>
     <Router>
      <LogoBar isSignUp={isSignUp} setIsSignUp={setIsSignUp} isLoggingIn={isLoggingIn} transactions={transactions}/>
      <Routes>
          <Route
            path="/"
            element={
            <Dashboard user={user} authReady={authReady} transactions={transactions}/>
            }>
          </Route>
          
          <Route
            path="/details"
            element={
            <Details transactions={transactions} setTransactions={setTransactions} transaction={transaction} errorState={errorState} setErrorState={setErrorState} loadingState={loadingState} setLoadingState={setLoadingState}/>
            }>
          </Route>

          <Route
            path="/signup"
            element={
            <SignUp isSignUp={isSignUp} setIsSignUp={setIsSignUp}/>
            }>
          </Route>

          <Route
            path="/profile"
            element={
            <Profile user={user} loading={loading}/>
            }>
          </Route>
      </Routes>
       <ToastContainer position="bottom-right" autoClose={2000} />
     </Router>
    </div>
  );
}

export default App;
