import axiosInstance from './axios';

export const userApi = {
  updateProfile: async (profileData) => {
    // For handling multipart/form-data when uploading files like profile images and resumes
    const headers = profileData instanceof FormData 
      ? { 'Content-Type': 'multipart/form-data' }
      : {};
    const response = await axiosInstance.put('/user/profile', profileData, { headers });
    return response.data;
  },

  getProfile: async (userId) => {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data;
  },
};
