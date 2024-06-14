import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import SignIn from "./Components/SignIn";
import { PrivateRoute } from "./Components/Layout/PrivateRoute";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/getOrgById/:id" element={<Orgs />} /> */}
          </Route>
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </Router>

      {/* <SignIn /> */}
      <Dashboard />
    </div>
  );
}

export default App;
