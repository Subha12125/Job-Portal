import React from 'react';
import JobCard from './JobCard';

const JobList = ({ jobs, loading }) => {
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
        <div className="spinner" style={{ width: '40px', height: '40px' }}></div>
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h3 className="title-sm" style={{ marginBottom: '10px' }}>No jobs found</h3>
        <p className="text-body" style={{ fontSize: '0.95rem' }}>We couldn't find any job listings matching your criteria. Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2" style={{ gap: '20px' }}>
      {jobs.map((job) => (
        <div key={job._id} className="animate-fade-in">
          <JobCard job={job} />
        </div>
      ))}
    </div>
  );
};

export default JobList;
