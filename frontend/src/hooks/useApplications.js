import { useState, useCallback } from 'react';
import { applicationApi } from '../api/applicationApi';

export const useApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCandidateApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await applicationApi.getCandidateApplications();
      setApplications(data.applications || data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching applications');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJobApplicants = useCallback(async (jobId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await applicationApi.getJobApplicants(jobId);
      setApplications(data.applicants || data);
      return data.applicants || data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching applicants');
    } finally {
      setLoading(false);
    }
  }, []);

  const applyToJob = async (applicationData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await applicationApi.applyToJob(applicationData);
      setApplications((prev) => [data.application || data, ...prev]);
      return data.application || data;
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Error applying for job';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setLoading(true);
    setError(null);
    try {
      const data = await applicationApi.updateApplicationStatus(id, status);
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: data.application?.status || status } : app))
      );
      return data.application || data;
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Error updating status';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    applications,
    loading,
    error,
    fetchCandidateApplications,
    fetchJobApplicants,
    applyToJob,
    updateStatus,
  };
};
