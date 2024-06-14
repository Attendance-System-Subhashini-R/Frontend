import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../redux/features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});
