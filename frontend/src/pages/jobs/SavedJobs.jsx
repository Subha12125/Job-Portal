import React, { useEffect, useState } from 'react';
import { jobApi } from '../../api/jobApi';
import JobCard from '../../components/jobs/JobCard';
import { Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSaved = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await jobApi.getSavedJobs();
        setSavedJobs(data.jobs || data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching saved jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="title-md" style={{ marginBottom: '8px' }}>Saved Jobs</h1>
      <p className="text-muted" style={{ marginBottom: '30px' }}>Keep track of job postings you are interested in</p>

      {error && (
        <div style={{
          backgroundColor: 'var(--danger-bg)',
          color: 'var(--danger)',
          padding: '12px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.9rem',
          marginBottom: '20px',
          fontWeight: 500
        }}>
          {error}
        </div>
      )}

      {savedJobs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <Bookmark size={40} style={{ color: 'var(--text-secondary)', marginBottom: '16px' }} />
          <h3 className="title-sm" style={{ marginBottom: '10px' }}>No Saved Jobs</h3>
          <p className="text-body" style={{ marginBottom: '20px', fontSize: '0.95rem' }}>You haven't bookmarked any jobs yet.</p>
          <Link to="/jobs" className="btn btn-primary">Find a Job</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2" style={{ gap: '20px' }}>
          {savedJobs.map((job) => (
            <div key={job._id}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
