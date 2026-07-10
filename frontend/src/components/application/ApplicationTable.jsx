import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

const ApplicationTable = ({ applications, onStatusUpdate, loading }) => {
  if (applications.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
        No applications received for this posting yet.
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--surface-hover)', borderBottom: '1px solid var(--border)' }}>
            <th style={{ padding: '12px 16px', fontWeight: 600 }}>Candidate</th>
            <th style={{ padding: '12px 16px', fontWeight: 600 }}>Contact info</th>
            <th style={{ padding: '12px 16px', fontWeight: 600 }}>Applied Date</th>
            <th style={{ padding: '12px 16px', fontWeight: 600 }}>Resume</th>
            <th style={{ padding: '12px 16px', fontWeight: 600 }}>Cover Letter</th>
            <th style={{ padding: '12px 16px', fontWeight: 600 }}>Action Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => {
            const candidate = app.candidate || {};
            return (
              <tr key={app._id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{candidate.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{candidate.headline || 'Job Seeker'}</div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div>{candidate.email}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{candidate.phone}</div>
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                  {formatDate(app.appliedAt)}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  {app.resume || candidate.resume ? (
                    <a
                      href={app.resume || candidate.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
                    >
                      <FileText size={16} />
                      <span>Resume</span>
                    </a>
                  ) : (
                    <span className="text-muted">Not uploaded</span>
                  )}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                  <p style={{
                    maxWidth: '220px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }} title={app.coverLetter}>
                    {app.coverLetter || 'No cover letter'}
                  </p>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <select
                    className="form-control form-select"
                    style={{ padding: '6px 12px', fontSize: '0.85rem', width: '130px' }}
                    value={app.status}
                    onChange={(e) => onStatusUpdate(app._id, e.target.value)}
                    disabled={loading}
                  >
                    <option value="applied">Applied</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                    <option value="hired">Hired</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTable;
