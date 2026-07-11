import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useJobs } from '../../hooks/useJobs';
import JobSearch from '../../components/jobs/JobSearch';
import JobFilter from '../../components/jobs/JobFilter';
import JobList from '../../components/jobs/JobList';

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobs, loading, fetchJobs } = useJobs();

  // Search keyword and location state
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');

  // Filter criteria state
  const [filters, setFilters] = useState({
    jobType: searchParams.get('jobType')?.split(',') || [],
    experience: searchParams.get('experience') || '',
    salaryMin: searchParams.get('salaryMin') || '',
    category: searchParams.get('category') || '',
  });

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    updateSearchParams(keyword, location, updatedFilters);
  };

  const handleClearFilters = () => {
    const cleared = { jobType: [], experience: '', salaryMin: '', category: '' };
    setFilters(cleared);
    updateSearchParams(keyword, location, cleared);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateSearchParams(keyword, location, filters);
  };

  const updateSearchParams = (kw, loc, filts) => {
    const params = {};
    if (kw) params.keyword = kw;
    if (loc) params.location = loc;
    if (filts.jobType.length > 0) params.jobType = filts.jobType.join(',');
    if (filts.experience) params.experience = filts.experience;
    if (filts.salaryMin) params.salaryMin = filts.salaryMin;
    if (filts.category) params.category = filts.category;
    setSearchParams(params);
  };

  // Sync state with URL params
  useEffect(() => {
    const query = {
      keyword: searchParams.get('keyword') || '',
      location: searchParams.get('location') || '',
      jobType: searchParams.get('jobType') || '',
      experience: searchParams.get('experience') || '',
      salaryMin: searchParams.get('salaryMin') || '',
      category: searchParams.get('category') || '',
    };
    fetchJobs(query);
  }, [searchParams, fetchJobs]);

  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <h1 className="title-lg" style={{ marginBottom: '8px' }}>Search Jobs</h1>
      <p className="text-body" style={{ marginBottom: '30px' }}>Find your next dream career path from global openings</p>

      {/* Global Search Bar */}
      <JobSearch
        keyword={keyword}
        location={location}
        onKeywordChange={setKeyword}
        onLocationChange={setLocation}
        onSubmit={handleSearchSubmit}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '30px' }}>
        {/* Left Side Filters */}
        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
          <JobFilter
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
          />
        </div>

        {/* Right Side Job Listings */}
        <div>
          <JobList jobs={jobs} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
