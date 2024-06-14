import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../../api/users.service.";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async () => {
    try {
      const response = await userService.getDashboradData();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const selectDashboardData = (state) => state.dashboard.data;
export const selectDashboardStatus = (state) => state.dashboard.status;

export default dashboardSlice.reducer;
