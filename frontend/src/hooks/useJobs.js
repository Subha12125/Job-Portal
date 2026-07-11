import { useState, useCallback } from 'react';
import { jobApi } from '../api/jobApi';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobApi.getAllJobs(filters);
      setJobs(data.jobs || data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJobById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobApi.getJobById(id);
      setCurrentJob(data.job || data);
      return data.job || data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching job details');
    } finally {
      setLoading(false);
    }
  }, []);

  const createJob = async (jobData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobApi.createJob(jobData);
      setJobs((prev) => [data.job || data, ...prev]);
      return data.job || data;
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Error creating job';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (id, jobData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobApi.updateJob(id, jobData);
      setCurrentJob(data.job || data);
      return data.job || data;
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Error updating job';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await jobApi.deleteJob(id);
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Error deleting job';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    jobs,
    currentJob,
    loading,
    error,
    fetchJobs,
    fetchJobById,
    createJob,
    updateJob,
    deleteJob,
  };
};
