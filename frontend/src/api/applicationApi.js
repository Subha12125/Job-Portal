import axiosInstance from './axios';

export const applicationApi = {
  applyToJob: async (applicationData) => {
    const response = await axiosInstance.post('/application', applicationData);
    return response.data;
  },

  getJobApplicants: async (jobId) => {
    const response = await axiosInstance.get(`/application/job/${jobId}`);
    return response.data;
  },

  getCandidateApplications: async () => {
    const response = await axiosInstance.get('/application/my-applications');
    return response.data;
  },

  updateApplicationStatus: async (id, status) => {
    const response = await axiosInstance.put(`/application/${id}/status`, { status });
    return response.data;
  },
};
