import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDashboardData,
  selectDashboardData,
  selectDashboardStatus,
} from "../redux/features/dashboard/dashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboardData = useSelector(selectDashboardData);
  const status = useSelector(selectDashboardStatus);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const calculateDailyHours = (inTime, outTime) => {
    if (inTime && outTime) {
      const inDate = new Date(inTime);
      const outDate = new Date(outTime);
      const diff = (outDate - inDate) / (1000 * 60 * 60);
      return diff.toFixed(2);
    }
    return "N/A";
  };
  const calculateTotalHours = (data) => {
    let totalHours = 0;
    data?.forEach((item) => {
      if (item.inTime && item.outTime) {
        const inTime = new Date(item.date + "T" + item.inTime + "Z");
        const outTime = new Date(item.date + "T" + item.outTime + "Z");
        const hoursDiff = (outTime - inTime) / (1000 * 60 * 60);
        totalHours += hoursDiff;
      }
    });
    return totalHours.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-600">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        {status === "loading" ? (
          <p className="text-gray-600">Loading...</p>
        ) : status === "error" ? (
          <p className="text-red-600">Failed to fetch dashboard data.</p>
        ) : (
          <>
            <div className="flex justify-around gap-8 mb-4">
              <div className="bg-blue-400 w-full rounded-lg p-4 text-white shadow-md">
                <h2 className="text-lg font-semibold mb-2">Current Clock Status</h2>
                <p className="text-xl">{dashboardData.length > 0 ? dashboardData[0].clockStatus : "N/A"}</p>
              </div>
              <div className="bg-yellow-400 w-full rounded-lg p-4 text-gray-800 shadow-md">
                <h2 className="text-lg font-semibold mb-2">Total Hours Worked</h2>
                <p className="text-xl">
                  {dashboardData.length > 0 ? calculateTotalHours() : "N/A"}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Previous Logs</h2>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-tight">Date</th>
                    <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-tight">Clock In</th>
                    <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-tight">Clock Out</th>
                    <th className="py-2 px-4 border-b-2 border-gray-300 text-left leading-tight">Total Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2 px-4 text-left">{item.date}</td>
                      <td className="py-2 px-4 text-left">{item.inTime ? new Date(item.inTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : "N/A" || "N/A"}</td>
                      <td className="py-2 px-4 text-left">{item.outTime ? new Date(item.outTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : "N/A" || "N/A"}</td>
                      <td className="py-2 px-4 text-left">
                        {calculateDailyHours(item.inTime, item.outTime)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
