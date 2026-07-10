import React, { useEffect } from 'react';
import { useApplications } from '../../hooks/useApplications';
import { formatDate } from '../../utils/formatDate';
import { Link } from 'react-router-dom';
import { Briefcase, Calendar } from 'lucide-react';

const AppliedJobs = () => {
  const { applications, loading, fetchCandidateApplications } = useApplications();

  useEffect(() => {
    fetchCandidateApplications();
  }, [fetchCandidateApplications]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'applied': return 'badge-info';
      case 'shortlisted': return 'badge-warning';
      case 'rejected': return 'badge-danger';
      case 'hired': return 'badge-success';
      default: return 'badge-info';
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="title-md" style={{ marginBottom: '8px' }}>Applied Jobs</h1>
      <p className="text-muted" style={{ marginBottom: '30px' }}>Keep track of all your submitted job applications</p>

      {applications.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <Briefcase size={40} style={{ color: 'var(--text-secondary)', marginBottom: '16px' }} />
          <h3 className="title-sm" style={{ marginBottom: '10px' }}>No Applications Yet</h3>
          <p className="text-body" style={{ marginBottom: '20px', fontSize: '0.95rem' }}>You haven't submitted applications to any jobs yet.</p>
          <Link to="/jobs" className="btn btn-primary">Find a Job</Link>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--surface-hover)', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Job Details</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Company</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Applied On</th>
                  <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => {
                  const job = app.job || {};
                  return (
                    <tr key={app._id} style={{ borderBottom: '1px solid var(--border)', transition: 'background-color var(--transition-fast)' }} className="table-row">
                      <td style={{ padding: '16px 24px' }}>
                        <Link to={`/jobs/${job._id}`} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          {job.title || 'Job Listing Deleted'}
                        </Link>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{job.location}</span>
                      </td>
                      <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>
                        {job.company?.name || 'Deleted Company'}
                      </td>
                      <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <Calendar size={14} />
                          {formatDate(app.appliedAt)}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span className={`badge ${getStatusBadgeClass(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
