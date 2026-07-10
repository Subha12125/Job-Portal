import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '40px 0',
      transition: 'background-color var(--transition-normal)'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '30px'
      }}>
        <div style={{ flex: '1 1 300px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '15px' }}>
            <Briefcase style={{ color: 'var(--primary)' }} />
            <span>Career<span style={{ color: 'var(--primary)' }}>Forge</span></span>
          </Link>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '280px', fontSize: '0.9rem' }}>
            Connecting talented candidates with top recruiters worldwide. Empowering careers, building futures.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '15px', color: 'var(--text-primary)' }}>For Candidates</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
              <li><Link to="/jobs" style={{ color: 'var(--text-secondary)' }}>Browse Jobs</Link></li>
              <li><Link to="/dashboard/candidate" style={{ color: 'var(--text-secondary)' }}>Applied Jobs</Link></li>
              <li><Link to="/profile" style={{ color: 'var(--text-secondary)' }}>My Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '15px', color: 'var(--text-primary)' }}>For Recruiters</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
              <li><Link to="/dashboard/recruiter" style={{ color: 'var(--text-secondary)' }}>Post a Job</Link></li>
              <li><Link to="/dashboard/recruiter/companies" style={{ color: 'var(--text-secondary)' }}>My Companies</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container" style={{
        marginTop: '30px',
        paddingTop: '20px',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.85rem'
      }}>
        <p>&copy; {new Date().getFullYear()} CareerForge. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
