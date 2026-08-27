import { Application } from './application.model.js';
import { Job } from '../job/job.model.js';

export const applyToJob = async (applicationData, candidateId) => {
  const { job: jobId, resume, coverLetter } = applicationData;
  if (!jobId) {
    throw new Error('Please provide job ID');
  }

  const job = await Job.findById(jobId);
  if (!job) {
    throw new Error('Job not found');
  }

  if (job.status !== 'open') {
    throw new Error('This job posting is no longer accepting applications');
  }

  const existingApplication = await Application.findOne({
    job: jobId,
    candidate: candidateId,
  });

  if (existingApplication) {
    throw new Error('You have already applied for this job');
  }

  const application = await Application.create({
    job: jobId,
    candidate: candidateId,
    resume: resume || '',
    coverLetter: coverLetter || '',
  });

  return await application.populate([
    { path: 'job', populate: { path: 'company', select: 'name companyLogo' } },
    { path: 'candidate', select: 'name email phone' },
  ]);
};

export const getJobApplicants = async (jobId, recruiterId) => {
  const job = await Job.findById(jobId);
  if (!job) {
    throw new Error('Job not found');
  }

  if (job.createdBy.toString() !== recruiterId.toString()) {
    throw new Error('Not authorized to view applicants for this job');
  }

  const applications = await Application.find({ job: jobId })
    .populate('candidate', 'name email phone resume profileImage skills headline experience education')
    .populate('job', 'title location jobType')
    .sort({ createdAt: -1 });

  return applications;
};

export const getCandidateApplications = async (candidateId) => {
  const applications = await Application.find({ candidate: candidateId })
    .populate({
      path: 'job',
      populate: { path: 'company', select: 'name companyLogo location' },
    })
    .sort({ createdAt: -1 });

  return applications;
};

export const updateApplicationStatus = async (applicationId, status, recruiterId) => {
  const application = await Application.findById(applicationId).populate('job');
  if (!application) {
    throw new Error('Application not found');
  }

  if (application.job.createdBy.toString() !== recruiterId.toString()) {
    throw new Error('Not authorized to update status for this application');
  }

  const validStatuses = ['applied', 'shortlisted', 'rejected', 'hired'];
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
  }

  application.status = status;
  await application.save();

  return application;
};
