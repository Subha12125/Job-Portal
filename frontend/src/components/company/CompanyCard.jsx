import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MapPin, Briefcase } from 'lucide-react';

const CompanyCard = ({ company }) => {
  const { _id, name, companyLogo, website, description, location, industry } = company;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
        <img
          src={companyLogo || '/logo.png'}
          alt={name}
          style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', border: '1px solid var(--border)' }}
        />
        <div>
          <h3 className="title-sm" style={{ fontSize: '1.1rem', marginBottom: '2px' }}>{name}</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Briefcase size={12} />
            {industry || 'General Industry'}
          </span>
        </div>
      </div>

      <p className="text-body" style={{
        fontSize: '0.85rem',
        marginBottom: '20px',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        flex: 1
      }}>
        {description || 'No description available for this organization.'}
      </p>

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
          {location || 'Remote'}
        </span>
        {website && website !== '#' && (
          <a href={website} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <Globe size={14} />
            <span>Website</span>
          </a>
        )}
      </div>

      <Link to={`/dashboard/recruiter/companies/${_id}`} className="btn btn-secondary btn-sm" style={{ marginTop: '16px' }}>
        Edit Details
      </Link>
    </div>
  );
};

export default CompanyCard;
