import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useJobs } from '../../hooks/useJobs';
import { useApplications } from '../../hooks/useApplications';
import { useAuth } from '../../hooks/useAuth';
import { MapPin, Briefcase, Calendar, DollarSign, Users, Award, ShieldAlert } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import Modal from '../../components/common/Modal';
import ApplyForm from '../../components/application/ApplyForm';

const JobDetails = () => {
  const { id } = useParams();
  const { currentJob, loading, fetchJobById } = useJobs();
  const { applyToJob, loading: applyLoading } = useApplications();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchJobById(id);
  }, [id, fetchJobById]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
        <div className="spinner" style={{ width: '40px', height: '40px' }}></div>
      </div>
    );
  }

  if (!currentJob) {
    return (
      <div className="container" style={{ marginTop: '50px', textAlign: 'center' }}>
        <h3 className="title-md">Job listing not found</h3>
        <p className="text-body" style={{ marginBottom: '20px' }}>The job details could not be loaded or the listing was removed.</p>
        <Link to="/jobs" className="btn btn-primary">Back to Search</Link>
      </div>
    );
  }

  const {
    title,
    description,
    company,
    location,
    jobType,
    experience,
    salaryMin,
    salaryMax,
    openings,
    applicationDeadline,
    skills = [],
    status,
  } = currentJob;

  const companyName = company?.name || 'Company Name';
  const companyLogo = company?.companyLogo || '/logo.png';
  const companyIndustry = company?.industry || 'Industry Profile';
  const companyWebsite = company?.website || '#';

  const handleApplySubmit = async (formData) => {
    setErrorMsg('');
    try {
      await applyToJob(formData);
      setSuccessMsg('Your application was submitted successfully!');
      setIsApplyModalOpen(false);
    } catch (err) {
      setErrorMsg(err.message || 'Could not submit application. You might have already applied.');
    }
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/jobs/${id}` } } });
      return;
    }
    setIsApplyModalOpen(true);
  };

  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <Link to="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 500 }}>
        &larr; Back to Job Board
      </Link>

      {successMsg && (
        <div style={{
          backgroundColor: 'var(--success-bg)',
          color: 'var(--success)',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          fontSize: '1rem',
          fontWeight: 600,
          marginBottom: '24px'
        }}>
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{
          backgroundColor: 'var(--danger-bg)',
          color: 'var(--danger)',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          fontSize: '1rem',
          fontWeight: 600,
          marginBottom: '24px'
        }}>
          {errorMsg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '30px' }}>
        {/* Main Job details card */}
        <div>
          <div className="card" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '30px' }}>
              <img
                src={companyLogo}
                alt={companyName}
                style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--border)' }}
              />
              <div style={{ flex: 1 }}>
                <h1 className="title-md" style={{ fontSize: '2rem', marginBottom: '6px' }}>{title}</h1>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{companyName}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <MapPin size={16} />
                    <span>{location}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick specifications */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px',
              padding: '20px',
              backgroundColor: 'var(--background)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '30px',
              border: '1px solid var(--border)'
            }}>
              <div>
                <span className="text-muted" style={{ display: 'block', marginBottom: '4px' }}>Job Type</span>
                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Briefcase size={16} style={{ color: 'var(--primary)' }} />
                  <span>{jobType}</span>
                </span>
              </div>
              <div>
                <span className="text-muted" style={{ display: 'block', marginBottom: '4px' }}>Salary Range</span>
                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <DollarSign size={16} style={{ color: 'var(--success)' }} />
                  <span>{salaryMin?.toLocaleString() || '0'} - {salaryMax?.toLocaleString() || 'Negotiable'}</span>
                </span>
              </div>
              <div>
                <span className="text-muted" style={{ display: 'block', marginBottom: '4px' }}>Experience</span>
                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={16} style={{ color: 'var(--warning)' }} />
                  <span>{experience === 0 ? 'Entry Level' : `${experience}+ Years`}</span>
                </span>
              </div>
              <div>
                <span className="text-muted" style={{ display: 'block', marginBottom: '4px' }}>Openings</span>
                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={16} style={{ color: 'var(--primary)' }} />
                  <span>{openings} Positions</span>
                </span>
              </div>
            </div>

            {/* Job Description */}
            <div style={{ marginBottom: '30px' }}>
              <h2 className="title-sm" style={{ marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Job Description</h2>
              <p className="text-body" style={{ whiteSpace: 'pre-wrap' }}>{description}</p>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="title-sm" style={{ marginBottom: '12px' }}>Skills Required</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {skills.map((skill, index) => (
                    <span key={index} className="badge badge-info" style={{ borderRadius: 'var(--radius-sm)' }}>{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 className="title-sm" style={{ marginBottom: '16px' }}>Apply Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Deadline:</span>
                <span style={{ fontWeight: 600 }}>{applicationDeadline ? formatDate(applicationDeadline) : 'Open Until Filled'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Job Status:</span>
                <span className={`badge ${status === 'open' ? 'badge-success' : 'badge-danger'}`}>{status}</span>
              </div>
            </div>

            {user?.role === 'recruiter' ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                backgroundColor: 'var(--warning-bg)',
                color: 'var(--warning)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 500
              }}>
                <ShieldAlert size={20} style={{ flexShrink: 0 }} />
                <span>Recruiters cannot apply to job postings.</span>
              </div>
            ) : (
              <button
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px' }}
                onClick={handleApplyClick}
                disabled={status === 'closed'}
              >
                Apply Now
              </button>
            )}
          </div>

          {/* Company Details Card */}
          <div className="card" style={{ padding: '24px' }}>
            <h3 className="title-sm" style={{ marginBottom: '12px' }}>About Company</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
              {company?.description || 'No description provided by the company.'}
            </p>
            <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <span className="text-muted">Industry:</span> <strong style={{ float: 'right' }}>{companyIndustry}</strong>
              </div>
              {companyWebsite !== '#' && (
                <div>
                  <span className="text-muted">Website:</span>{' '}
                  <a href={companyWebsite} target="_blank" rel="noopener noreferrer" style={{ float: 'right', fontWeight: 600 }}>
                    Visit Site &rarr;
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <Modal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} title={`Apply for ${title}`}>
        <ApplyForm
          jobId={id}
          onSubmit={handleApplySubmit}
          onCancel={() => setIsApplyModalOpen(false)}
          loading={applyLoading}
        />
      </Modal>
    </div>
  );
};

export default JobDetails;
