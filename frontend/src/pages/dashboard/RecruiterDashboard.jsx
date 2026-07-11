import React, { useEffect, useState } from 'react';
import { useJobs } from '../../hooks/useJobs';
import { useApplications } from '../../hooks/useApplications';
import { companyApi } from '../../api/companyApi';
import { jobApi } from '../../api/jobApi';
import DashboardStats from '../../components/dashboard/DashboardStats';
import ApplicationTable from '../../components/application/ApplicationTable';
import Modal from '../../components/common/Modal';
import { Plus, Users, Calendar, Award, Building, Eye, ChevronRight } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

const RecruiterDashboard = () => {
  const { jobs, loading, createJob, updateJob, deleteJob } = useJobs();
  const { applications, loading: applicantsLoading, fetchJobApplicants, updateStatus } = useApplications();
  
  const [recruiterJobs, setRecruiterJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [stats, setStats] = useState([]);

  // Modals state
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // New Job form state
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    jobType: 'Full-Time',
    experience: 0,
    salaryMin: '',
    salaryMax: '',
    skills: '',
    openings: 1,
    applicationDeadline: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchDashboardData = async () => {
    try {
      const jobData = await jobApi.getRecruiterJobs();
      setRecruiterJobs(jobData.jobs || jobData);
      
      const compData = await companyApi.getMyCompanies();
      setCompanies(compData.companies || compData);

      // Aggregating simple mock/local stats
      let totalApplicants = 0;
      // Fetch total applicants count if needed, or aggregate from jobs if nested
      setStats([
        { label: 'Jobs Posted', value: (jobData.jobs || jobData).length, icon: 'jobs' },
        { label: 'Registered Companies', value: (compData.companies || compData).length, icon: 'companies' },
        { label: 'Active Openings', value: (jobData.jobs || jobData).filter(j => j.status === 'open').length, icon: 'users' },
      ]);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleJobFormChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

  const handleCreateJobSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!jobForm.company) {
      setError('Please select a company. You must register a company first.');
      return;
    }

    try {
      const skillsArray = jobForm.skills
        ? jobForm.skills.split(',').map(s => s.trim()).filter(s => s)
        : [];
      
      const payload = {
        ...jobForm,
        experience: Number(jobForm.experience),
        openings: Number(jobForm.openings),
        salaryMin: jobForm.salaryMin ? Number(jobForm.salaryMin) : undefined,
        salaryMax: jobForm.salaryMax ? Number(jobForm.salaryMax) : undefined,
        skills: skillsArray,
      };

      await createJob(payload);
      setSuccess('Job posting created successfully!');
      setIsJobModalOpen(false);
      
      // Reset form
      setJobForm({
        title: '',
        description: '',
        company: companies[0]?._id || '',
        location: '',
        jobType: 'Full-Time',
        experience: 0,
        salaryMin: '',
        salaryMax: '',
        skills: '',
        openings: 1,
        applicationDeadline: '',
      });

      fetchDashboardData();
    } catch (err) {
      setError(err.message || 'Error creating job posting');
    }
  };

  const handleViewApplicants = async (job) => {
    setSelectedJob(job);
    setIsApplicantsModalOpen(true);
    await fetchJobApplicants(job._id);
  };

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await updateStatus(applicationId, status);
      // Refresh applicants list
      if (selectedJob) {
        await fetchJobApplicants(selectedJob._id);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 className="title-md" style={{ marginBottom: '6px' }}>Recruiter Dashboard</h1>
          <p className="text-muted">Manage company vacancies, review applicants and update statuses</p>
        </div>
        
        <button
          className="btn btn-primary"
          onClick={() => {
            if (companies.length === 0) {
              setError('You must register a company first in the Companies tab before posting a job.');
              return;
            }
            setJobForm(prev => ({ ...prev, company: companies[0]?._id || '' }));
            setIsJobModalOpen(true);
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={18} />
          <span>Post a Job</span>
        </button>
      </div>

      {error && (
        <div style={{
          backgroundColor: 'var(--danger-bg)',
          color: 'var(--danger)',
          padding: '12px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.9rem',
          fontWeight: 600,
          marginBottom: '20px'
        }}>{error}</div>
      )}

      {success && (
        <div style={{
          backgroundColor: 'var(--success-bg)',
          color: 'var(--success)',
          padding: '12px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.9rem',
          fontWeight: 600,
          marginBottom: '20px'
        }}>{success}</div>
      )}

      {/* Stats Cards */}
      <DashboardStats stats={stats} />

      {/* Jobs Posted Section */}
      <div className="card" style={{ padding: '24px' }}>
        <h3 className="title-sm" style={{ marginBottom: '20px' }}>Posted Job Openings</h3>

        {recruiterJobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
            You haven't posted any job listings yet.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--surface-hover)', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Role Details</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Company</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Type</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Deadline</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Applicants</th>
                </tr>
              </thead>
              <tbody>
                {recruiterJobs.map((job) => (
                  <tr key={job._id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{job.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{job.location}</div>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                      {job.company?.name || 'My Company'}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="badge badge-info">{job.jobType}</span>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                      {job.applicationDeadline ? formatDate(job.applicationDeadline) : 'Open'}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        onClick={() => handleViewApplicants(job)}
                      >
                        <Eye size={14} />
                        <span>Applicants</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Post a Job Modal */}
      <Modal isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} title="Create New Job Posting">
        <form onSubmit={handleCreateJobSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="title">Job Title</label>
              <input
                className="form-control"
                type="text"
                id="title"
                name="title"
                value={jobForm.title}
                onChange={handleJobFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="company">Select Company</label>
              <select
                className="form-control form-select"
                id="company"
                name="company"
                value={jobForm.company}
                onChange={handleJobFormChange}
                required
              >
                {companies.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="location">Job Location</label>
              <input
                className="form-control"
                type="text"
                id="location"
                name="location"
                value={jobForm.location}
                onChange={handleJobFormChange}
                placeholder="e.g. Austin, TX or Remote"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="jobType">Job Type</label>
              <select
                className="form-control form-select"
                id="jobType"
                name="jobType"
                value={jobForm.jobType}
                onChange={handleJobFormChange}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">Job Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="4"
              value={jobForm.description}
              onChange={handleJobFormChange}
              required
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="grid grid-cols-3" style={{ gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="experience">Min Experience (Years)</label>
              <input
                className="form-control"
                type="number"
                id="experience"
                name="experience"
                min="0"
                value={jobForm.experience}
                onChange={handleJobFormChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="salaryMin">Min Salary ($)</label>
              <input
                className="form-control"
                type="number"
                id="salaryMin"
                name="salaryMin"
                value={jobForm.salaryMin}
                onChange={handleJobFormChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="salaryMax">Max Salary ($)</label>
              <input
                className="form-control"
                type="number"
                id="salaryMax"
                name="salaryMax"
                value={jobForm.salaryMax}
                onChange={handleJobFormChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="openings">Positions Open</label>
              <input
                className="form-control"
                type="number"
                id="openings"
                name="openings"
                min="1"
                value={jobForm.openings}
                onChange={handleJobFormChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="applicationDeadline">Application Deadline</label>
              <input
                className="form-control"
                type="date"
                id="applicationDeadline"
                name="applicationDeadline"
                value={jobForm.applicationDeadline}
                onChange={handleJobFormChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="skills">Skills Required (Comma-separated)</label>
            <input
              className="form-control"
              type="text"
              id="skills"
              name="skills"
              value={jobForm.skills}
              onChange={handleJobFormChange}
              placeholder="e.g. React, CSS, GraphQL"
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsJobModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Post Listing
            </button>
          </div>
        </form>
      </Modal>

      {/* Applicants List Modal */}
      <Modal isOpen={isApplicantsModalOpen} onClose={() => setIsApplicantsModalOpen(false)} title={`Applicants for ${selectedJob?.title}`}>
        {applicantsLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
            <div className="spinner"></div>
          </div>
        ) : (
          <ApplicationTable
            applications={applications}
            onStatusUpdate={handleStatusUpdate}
            loading={applicantsLoading}
          />
        )}
      </Modal>
    </div>
  );
};

export default RecruiterDashboard;
