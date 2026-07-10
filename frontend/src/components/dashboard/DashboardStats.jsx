import React from 'react';
import { Briefcase, Users, Building, Bookmark } from 'lucide-react';

const DashboardStats = ({ stats = [] }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'jobs': return <Briefcase size={24} />;
      case 'users': return <Users size={24} />;
      case 'companies': return <Building size={24} />;
      case 'saved': return <Bookmark size={24} />;
      default: return <Briefcase size={24} />;
    }
  };

  return (
    <div className="grid grid-cols-4" style={{ gap: '20px', marginBottom: '30px' }}>
      {stats.map((stat, index) => (
        <div key={index} className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px 24px' }}>
          <div style={{
            display: 'inline-flex',
            padding: '12px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--primary-glow)',
            color: 'var(--primary)'
          }}>
            {getIcon(stat.icon)}
          </div>
          <div>
            <span className="text-muted" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>{stat.label}</span>
            <strong style={{ fontSize: '1.75rem', lineHeight: 1, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              {stat.value}
            </strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
