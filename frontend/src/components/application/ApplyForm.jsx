import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const ApplyForm = ({ jobId, onSubmit, onCancel, loading }) => {
  const { user } = useAuth();
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const [useProfileResume, setUseProfileResume] = useState(!!user?.resume);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!useProfileResume && !resume) {
      setError('Please upload a resume or choose to use your profile resume');
      return;
    }

    const formData = new FormData();
    formData.append('job', jobId);
    formData.append('coverLetter', coverLetter);
    
    if (useProfileResume) {
      formData.append('useProfileResume', 'true');
    } else if (resume) {
      formData.append('resume', resume);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {error && (
        <div style={{
          backgroundColor: 'var(--danger-bg)',
          color: 'var(--danger)',
          padding: '10px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.9rem',
          fontWeight: 500
        }}>
          {error}
        </div>
      )}

      {/* Resume Option */}
      <div className="form-group">
        <label className="form-label">Resume</label>
        
        {user?.resume && (
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer', marginBottom: '10px' }}>
            <input
              type="checkbox"
              checked={useProfileResume}
              onChange={(e) => setUseProfileResume(e.target.checked)}
              style={{ accentColor: 'var(--primary)' }}
            />
            <span>Use my saved resume ({user.resume.split('/').pop()})</span>
          </label>
        )}

        {!useProfileResume && (
          <input
            className="form-control"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            required={!useProfileResume}
          />
        )}
      </div>

      {/* Cover Letter */}
      <div className="form-group">
        <label className="form-label" htmlFor="coverLetter">Cover Letter</label>
        <textarea
          className="form-control"
          id="coverLetter"
          rows="6"
          placeholder="Introduce yourself and explain why you're a great fit for this role..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          required
          style={{ resize: 'vertical', minHeight: '120px' }}
        />
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting Application...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
};

export default ApplyForm;
