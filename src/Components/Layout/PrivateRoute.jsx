import { Navigate, Outlet } from "react-router-dom";
import Dashboard from "../Dashboard";
import { getLocalStorageItem } from "../../services/localStorageServices";
import Navbar from "../Navbar";
// import NavBar from "../Nav/NavBar";
export const PrivateRoute = () => {
  let getToken = localStorage.getItem("user_token");

  return (
    <div>
      {getToken == null ? (
        <Navigate to="/login" />
      ) : (
        <div className="justify-between flex flex-col ">
          <Navbar />
          {/* <Dashboard /> */}

          <Outlet />
        </div>
      )}
    </div>
  );
};
