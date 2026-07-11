import axiosInstance from './axios';

export const userApi = {
  updateProfile: async (profileData) => {
    const response = await axiosInstance.put('/user/profile', profileData);
    return response.data;
  },

  getProfile: async (userId) => {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data;
  },
};
