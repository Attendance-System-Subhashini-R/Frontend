import { Navigate, Outlet } from "react-router-dom";
import Dashboard from "../Dashboard";
import { getLocalStorageItem } from "../../services/localStorageServices";
// import NavBar from "../Nav/NavBar";
export const PrivateRoute = () => {
  let getToken = getLocalStorageItem("user_token");

  return (
    <div>
      {getToken == null ? (
        <Navigate to="/login" />
      ) : (
        <div className="justify-between flex flex-col ">
          {/* <NavBar /> */}
          <Dashboard />
          <Outlet />
        </div>
      )}
    </div>
  );
};
