import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useApplications } from '../../hooks/useApplications';
import { jobApi } from '../../api/jobApi';
import DashboardStats from '../../components/dashboard/DashboardStats';
import JobCard from '../../components/jobs/JobCard';
import { Briefcase, ArrowRight, Bookmark } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

const CandidateDashboard = () => {
  const { user } = useAuth();
  const { applications, loading, fetchCandidateApplications } = useApplications();
  const [savedJobs, setSavedJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  useEffect(() => {
    fetchCandidateApplications();

    // Fetch saved jobs
    const fetchSaved = async () => {
      try {
        const data = await jobApi.getSavedJobs();
        setSavedJobs(data.jobs || data);
      } catch (err) {
        console.error('Error fetching saved:', err);
      }
    };
    fetchSaved();

    // Fetch recommended/latest jobs
    const fetchRecommended = async () => {
      try {
        const data = await jobApi.getAllJobs({ limit: 2 });
        setRecommendedJobs(data.jobs || data);
      } catch (err) {
        console.error('Error fetching recommended:', err);
      }
    };
    fetchRecommended();
  }, [fetchCandidateApplications]);

  const stats = [
    { label: 'Applied Applications', value: applications.length, icon: 'jobs' },
    { label: 'Saved Postings', value: savedJobs.length, icon: 'saved' },
    { label: 'Profile Rating', value: user?.resume ? '100%' : '60%', icon: 'users' },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '30px' }}>
        <h1 className="title-md" style={{ marginBottom: '6px' }}>Candidate Dashboard</h1>
        <p className="text-muted">Track applications, saved bookmarks, and recommended openings</p>
      </div>

      {/* Stats Cards */}
      <DashboardStats stats={stats} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '30px' }}>
        {/* Left Side: Recent Applications */}
        <div>
          <div className="card" style={{ padding: '24px', minHeight: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="title-sm" style={{ fontSize: '1.1rem' }}>Recent Applications</h3>
              <Link to="/dashboard/candidate/applied" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>See All</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
                <div className="spinner"></div>
              </div>
            ) : applications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                You haven't applied to any jobs yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {applications.slice(0, 3).map((app) => {
                  const job = app.job || {};
                  return (
                    <div key={app._id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px',
                      backgroundColor: 'var(--surface-hover)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      transition: 'border-color var(--transition-fast)'
                    }}>
                      <div>
                        <h4 className="title-sm" style={{ fontSize: '0.95rem', marginBottom: '4px' }}>
                          <Link to={`/jobs/${job._id}`} style={{ color: 'var(--text-primary)' }}>{job.title}</Link>
                        </h4>
                        <span className="text-muted" style={{ fontSize: '0.8rem' }}>{job.company?.name} &bull; Applied on {formatDate(app.appliedAt)}</span>
                      </div>
                      <span className={`badge badge-info`}>{app.status}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recommended Jobs */}
          <div style={{ marginTop: '30px' }}>
            <h3 className="title-sm" style={{ marginBottom: '20px' }}>Recommended Postings</h3>
            <div className="grid grid-cols-2" style={{ gap: '20px' }}>
              {recommendedJobs.map((job) => (
                <div key={job._id}>
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Saved Jobs Panel */}
        <div>
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="title-sm" style={{ fontSize: '1.1rem' }}>Saved Jobs</h3>
              <Link to="/dashboard/candidate/saved" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                <span>See All</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {savedJobs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                No saved bookmarks yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {savedJobs.slice(0, 3).map((job) => (
                  <div key={job._id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img
                      src={job.company?.companyLogo || '/logo.png'}
                      alt={job.company?.name}
                      style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover', border: '1px solid var(--border)' }}
                    />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <h4 className="title-sm" style={{ fontSize: '0.9rem', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <Link to={`/jobs/${job._id}`} style={{ color: 'var(--text-primary)' }}>{job.title}</Link>
                      </h4>
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>{job.company?.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
