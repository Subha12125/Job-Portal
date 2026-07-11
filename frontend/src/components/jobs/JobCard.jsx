import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Calendar, DollarSign } from 'lucide-react';
import { formatRelativeTime } from '../../utils/formatDate';

const JobCard = ({ job }) => {
  const {
    _id,
    title,
    description,
    company,
    location,
    jobType,
    salaryMin,
    salaryMax,
    createdAt,
    skills = [],
  } = job;

  const companyName = company?.name || 'Company Profile';
  const companyLogo = company?.companyLogo || '/logo.png';

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'flex-start' }}>
        <img
          src={companyLogo}
          alt={companyName}
          style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', border: '1px solid var(--border)' }}
        />
        <div>
          <h3 className="title-sm" style={{ fontSize: '1.1rem', marginBottom: '4px' }}>
            <Link to={`/jobs/${_id}`} style={{ color: 'var(--text-primary)' }}>{title}</Link>
          </h3>
          <p className="text-muted" style={{ fontWeight: 500 }}>{companyName}</p>
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <span className="badge badge-info">{jobType}</span>
        {salaryMin && salaryMax && (
          <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <DollarSign size={12} />
            <span>{salaryMin.toLocaleString()} - {salaryMax.toLocaleString()}</span>
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-body" style={{
        fontSize: '0.9rem',
        marginBottom: '20px',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        flex: 1
      }}>
        {description}
      </p>

      {/* Skills Required */}
      {skills.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {skills.slice(0, 3).map((skill, index) => (
            <span key={index} style={{
              fontSize: '0.75rem',
              backgroundColor: 'var(--background)',
              color: 'var(--text-secondary)',
              padding: '2px 8px',
              borderRadius: '4px',
              border: '1px solid var(--border)',
            }}>
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', alignSelf: 'center' }}>
              +{skills.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer Info */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '16px',
        borderTop: '1px solid var(--border)',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={14} />
          <span>{location}</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Calendar size={14} />
          <span>{formatRelativeTime(createdAt)}</span>
        </span>
      </div>
    </div>
  );
};

export default JobCard;
