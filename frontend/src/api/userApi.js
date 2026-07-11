import axiosInstance from './axios';

export const userApi = {
  updateProfile: async (profileData) => {
    const headers = profileData instanceof FormData 
      ? { 'Content-Type': undefined }
      : {};
    const response = await axiosInstance.put('/user/profile', profileData, { headers });
    return response.data;
  },

  getProfile: async (userId) => {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data;
  },
};
