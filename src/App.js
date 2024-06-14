import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  RouterProvider,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from "./Components/SignIn";
import { PrivateRoute } from "./Components/Layout/PrivateRoute";
import Dashboard from "./Components/Dashboard";
import ClockIn from "./Components/ClockIn";
let getToken = localStorage.getItem("user_token");

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clockin" element={<ClockIn />} />
          </Route>
          <Route
            path="/login"
            element={getToken == null ? <SignIn /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
