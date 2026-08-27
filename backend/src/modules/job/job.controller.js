import {
  createJob,
  getAllJobs,
  getJobById,
  getRecruiterJobs,
  updateJob,
  deleteJob,
} from './job.service.js';

export const createJobController = async (req, res) => {
  try {
    const job = await createJob(req.body, req.user._id);
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllJobsController = async (req, res) => {
  try {
    const jobs = await getAllJobs(req.query);
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getJobByIdController = async (req, res) => {
  try {
    const job = await getJobById(req.params.id);
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getRecruiterJobsController = async (req, res) => {
  try {
    const jobs = await getRecruiterJobs(req.user._id);
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateJobController = async (req, res) => {
  try {
    const job = await updateJob(req.params.id, req.body, req.user._id);
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteJobController = async (req, res) => {
  try {
    const result = await deleteJob(req.params.id, req.user._id);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getSavedJobsController = async (req, res) => {
  res.status(200).json({ success: true, data: [] });
};

export const saveJobController = async (req, res) => {
  res.status(200).json({ success: true, message: 'Job saved' });
};
