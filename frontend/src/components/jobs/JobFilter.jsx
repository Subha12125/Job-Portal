import React from 'react';
import { JOB_TYPES } from '../../utils/constants';

const JobFilter = ({ filters, onChange, onClear }) => {
  const handleTypeChange = (type) => {
    const isChecked = filters.jobType?.includes(type);
    let updatedTypes = [];
    if (isChecked) {
      updatedTypes = filters.jobType.filter((t) => t !== type);
    } else {
      updatedTypes = [...(filters.jobType || []), type];
    }
    onChange('jobType', updatedTypes);
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="title-sm" style={{ fontSize: '1.05rem' }}>Filters</h3>
        <button onClick={onClear} style={{
          background: 'none',
          border: 'none',
          color: 'var(--primary)',
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontWeight: 600
        }}>
          Clear All
        </button>
      </div>

      <div style={{ height: '1px', backgroundColor: 'var(--border)' }}></div>

      {/* Job Type */}
      <div>
        <h4 className="form-label" style={{ marginBottom: '12px' }}>Job Type</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {JOB_TYPES.map((type) => (
            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filters.jobType?.includes(type) || false}
                onChange={() => handleTypeChange(type)}
                style={{
                  accentColor: 'var(--primary)',
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer'
                }}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: 'var(--border)' }}></div>

      {/* Experience */}
      <div className="form-group">
        <label className="form-label" htmlFor="experience">Min Experience (Years)</label>
        <input
          className="form-control"
          type="number"
          id="experience"
          name="experience"
          min="0"
          value={filters.experience || ''}
          onChange={(e) => onChange('experience', e.target.value)}
          placeholder="e.g. 2"
        />
      </div>

      {/* Min Salary */}
      <div className="form-group">
        <label className="form-label" htmlFor="salaryMin">Min Salary ($)</label>
        <input
          className="form-control"
          type="number"
          id="salaryMin"
          name="salaryMin"
          min="0"
          value={filters.salaryMin || ''}
          onChange={(e) => onChange('salaryMin', e.target.value)}
          placeholder="e.g. 50000"
        />
      </div>
    </div>
  );
};

export default JobFilter;
