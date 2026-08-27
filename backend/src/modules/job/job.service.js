import { Job } from './job.model.js';

export const createJob = async (jobData, userId) => {
  const { title, description, company, location, jobType } = jobData;
  if (!title || !description || !company || !location || !jobType) {
    throw new Error('Please provide title, description, company, location, and jobType');
  }

  const job = await Job.create({
    ...jobData,
    createdBy: userId,
  });

  return await job.populate(['company', 'createdBy']);
};

export const getAllJobs = async (query = {}) => {
  const filter = {};

  if (query.keyword) {
    filter.$or = [
      { title: { $regex: query.keyword, $options: 'i' } },
      { description: { $regex: query.keyword, $options: 'i' } },
      { skills: { $in: [new RegExp(query.keyword, 'i')] } },
    ];
  }

  if (query.location) {
    filter.location = { $regex: query.location, $options: 'i' };
  }

  if (query.jobType) {
    filter.jobType = query.jobType;
  }

  if (query.status) {
    filter.status = query.status;
  }

  const jobs = await Job.find(filter)
    .populate('company', 'name companyLogo location industry')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  return jobs;
};

export const getJobById = async (id) => {
  const job = await Job.findById(id)
    .populate('company')
    .populate('createdBy', 'name email phone');

  if (!job) {
    throw new Error('Job not found');
  }

  return job;
};

export const getRecruiterJobs = async (userId) => {
  const jobs = await Job.find({ createdBy: userId })
    .populate('company')
    .sort({ createdAt: -1 });
  return jobs;
};

export const updateJob = async (id, jobData, userId) => {
  const job = await Job.findById(id);
  if (!job) {
    throw new Error('Job not found');
  }

  if (job.createdBy.toString() !== userId.toString()) {
    throw new Error('Not authorized to update this job');
  }

  const updatedJob = await Job.findByIdAndUpdate(id, jobData, {
    new: true,
    runValidators: true,
  }).populate(['company', 'createdBy']);

  return updatedJob;
};

export const deleteJob = async (id, userId) => {
  const job = await Job.findById(id);
  if (!job) {
    throw new Error('Job not found');
  }

  if (job.createdBy.toString() !== userId.toString()) {
    throw new Error('Not authorized to delete this job');
  }

  await Job.findByIdAndDelete(id);
  return { message: 'Job removed successfully' };
};
