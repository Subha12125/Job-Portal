import React from 'react';
import { Search, MapPin } from 'lucide-react';

const JobSearch = ({ keyword, location, onKeywordChange, onLocationChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} style={{
      display: 'flex',
      backgroundColor: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '6px',
      boxShadow: 'var(--shadow-sm)',
      gap: '8px',
      width: '100%',
      flexWrap: 'wrap',
      marginBottom: '30px'
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', minWidth: '200px' }}>
        <Search size={18} style={{ color: 'var(--text-secondary)' }} />
        <input
          type="text"
          placeholder="Search job title, skills, keywords..."
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-primary)', fontSize: '0.95rem' }}
        />
      </div>

      <div style={{ width: '1px', backgroundColor: 'var(--border)', alignSelf: 'stretch' }} className="divider"></div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', minWidth: '200px' }}>
        <MapPin size={18} style={{ color: 'var(--text-secondary)' }} />
        <input
          type="text"
          placeholder="Location (city, remote)..."
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-primary)', fontSize: '0.95rem' }}
        />
      </div>

      <button type="submit" className="btn btn-primary" style={{ padding: '8px 24px', borderRadius: 'var(--radius-md)' }}>
        Find Jobs
      </button>
    </form>
  );
};

export default JobSearch;
