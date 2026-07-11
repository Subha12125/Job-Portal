import axiosInstance from './axios';

export const companyApi = {
  getAllCompanies: async () => {
    const response = await axiosInstance.get('/company');
    return response.data;
  },

  getCompanyById: async (id) => {
    const response = await axiosInstance.get(`/company/${id}`);
    return response.data;
  },

  createCompany: async (companyData) => {
    const response = await axiosInstance.post('/company', companyData);
    return response.data;
  },

  updateCompany: async (id, companyData) => {
    const response = await axiosInstance.put(`/company/${id}`, companyData);
    return response.data;
  },

  getMyCompanies: async () => {
    const response = await axiosInstance.get('/company/owner/my-companies');
    return response.data;
  },
};
