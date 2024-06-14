import axiosInstance from "./axiosInstance";
let base_url = "/user";

const userService = {
  loginUser: async (payload) => {
    try {
      const response = await axiosInstance.post(`${base_url}/login`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDashboradData:async()=>{
    try {
      const response = await axiosInstance.get(`/attendance/getall-times`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  clockIn:async(payload)=>{
    try {
      const response = await axiosInstance.post(`/attendance/create-time`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  editTimeFrame:async(id, payload)=>{
    try {
      const response = await axiosInstance.patch(`/attendance/update-time?id=${id}`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

};

export default userService;
