import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Navbar() {
  const [clockedIn, setClockedIn] = useState(false);
  const navigate = useNavigate();

  const handleClockInOut = () => {
    navigate( "/clockin");
    setClockedIn(!clockedIn);
  };

  const handleLogout = async () => {
    try {
      await localStorage.removeItem("user_token");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (

    <div className="h-16 bg-blue-400">
      <div className="container mx-auto h-full flex justify-between items-center px-4">
        <div className="text-white cursor-pointer font-bold" onClick={()=>{
             navigate( "/");
        }}>Attendance</div>
        <div className="space-x-4">
          <button
            className="bg-white text-blue-400 font-semibold py-2 px-4 rounded"
            onClick={handleClockInOut}
          >
            {"Clock In/Clock Out "}
          </button>
          <button
            className="bg-white text-blue-400 font-semibold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
