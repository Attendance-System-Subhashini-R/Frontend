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
};

export default userService;
