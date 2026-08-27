import {
  applyToJob,
  getJobApplicants,
  getCandidateApplications,
  updateApplicationStatus,
} from './application.service.js';

export const applyToJobController = async (req, res) => {
  try {
    const application = await applyToJob(req.body, req.user._id);
    res.status(201).json({ success: true, data: application });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getJobApplicantsController = async (req, res) => {
  try {
    const applications = await getJobApplicants(req.params.jobId, req.user._id);
    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCandidateApplicationsController = async (req, res) => {
  try {
    const applications = await getCandidateApplications(req.user._id);
    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateApplicationStatusController = async (req, res) => {
  try {
    const application = await updateApplicationStatus(
      req.params.id,
      req.body.status,
      req.user._id
    );
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
