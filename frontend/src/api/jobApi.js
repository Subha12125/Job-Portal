import axiosInstance from './axios';

export const jobApi = {
  getAllJobs: async (filters = {}) => {
    const filtered = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== undefined && v !== null && v !== '')
    );
    const params = new URLSearchParams(filtered).toString();
    const response = await axiosInstance.get(params ? `/job?${params}` : '/job');
    return response.data;
  },

  getJobById: async (id) => {
    const response = await axiosInstance.get(`/job/${id}`);
    return response.data;
  },

  createJob: async (jobData) => {
    const response = await axiosInstance.post('/job', jobData);
    return response.data;
  },

  updateJob: async (id, jobData) => {
    const response = await axiosInstance.put(`/job/${id}`, jobData);
    return response.data;
  },

  deleteJob: async (id) => {
    const response = await axiosInstance.delete(`/job/${id}`);
    return response.data;
  },

  getRecruiterJobs: async () => {
    const response = await axiosInstance.get('/job/recruiter/my-jobs');
    return response.data;
  },

  getSavedJobs: async () => {
    const response = await axiosInstance.get('/job/saved');
    return response.data;
  },

  saveJob: async (id) => {
    const response = await axiosInstance.post(`/job/save/${id}`);
    return response.data;
  },
};
