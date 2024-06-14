import React, { useState, useEffect } from "react";
import userService from "../api/users.service.";

const ClockIn = () => {
  const [clockStatus, setClockStatus] = useState("In");
  const [currentDate, setCurrentDate] = useState("");
  const [dashboardData, setDashboardData] = useState([]);
  const [totalHoursWorked, setTotalHoursWorked] = useState(0);

  async function fetchDashboardData() {
    try {
      const response = await userService.getDashboradData();
      const currentDate = new Date().toISOString().split("T")[0];
      console.log(response.data, ">>")
      const filteredData = response.data.filter(
        (entry) => entry.date === currentDate
      );
      console.log(filteredData, ">>")


      if (filteredData.length > 0) {
        setDashboardData(filteredData);

        const latestEntry = filteredData[0];
        setClockStatus(latestEntry.clockStatus);
      } else {
        setDashboardData([]);
        setClockStatus("Out");
        setTotalHoursWorked(0);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  }

  useEffect(() => {
      fetchDashboardData();
    getCurrentDate();
  }, []);

 

  const getCurrentDate = () => {
    const date = new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(date);
  };

  const handleClockAction = async () => {
    try {
      let payload = {};
      if (clockStatus === "In") {
        payload = {
          inTime: null,
          outTime: new Date().toISOString(),
          clockStatus: "Out",
          date: new Date().toISOString().split("T")[0],
        };
        await userService.clockIn(payload);
        setClockStatus("Out");
      } else {
        payload = {
          inTime: new Date().toISOString(),
          outTime: null,
          clockStatus: "In",
          date: new Date().toISOString().split("T")[0],
        };
        await userService.clockIn(payload);
        setClockStatus("In");
      }
      fetchDashboardData();
    } catch (error) {
      console.error("Clock action failed:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r h-screen from-blue-500 to-blue-600 text-white shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">{currentDate}</h2>
        <p className="text-lg">Clock Status: {clockStatus}</p>
      </div>
      <div className="flex justify-center items-center my-4">
        <button
          onClick={handleClockAction}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-12 rounded-full focus:outline-none transform transition-transform ${
            clockStatus === "In" ? "scale-75" : ""
          }`}
        >
          {clockStatus === "In" ? "Clock Out" : "Clock In"}
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h3 className="text-xl font-semibold bg-blue-500 text-white py-4 px-6">
          Today's Time Log
        </h3>
        <table className="min-w-full">
          <thead>
            <tr className="bg-blue-100 text-blue-900">
              <th className="py-2 px-4">Clock In</th>
              <th className="py-2 px-4">Clock Out</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.map((entry) => (
              <tr key={entry.id} className="border-b">
                <td className="py-3 px-4 text-black">
                  {entry.inTime ? new Date(entry.inTime).toLocaleTimeString() : "N/A" || "N/A"}
                </td>
                <td className="py-3 px-4 text-black">
                  {entry.outTime ? new Date(entry.outTime).toLocaleTimeString() : "N/A" || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClockIn;
