import LogoBar from "./components/ui/LogoBar"
import Dashboard from "./pages/Dashboard"
import Details from "./pages/Details"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './index.css';

function App() {
  return (
    <div>
     <Router>
      <LogoBar/>
      <Routes>
          <Route
            path="/"
            element={
            <Dashboard/>
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
            <Profile/>
            }>
          </Route>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
