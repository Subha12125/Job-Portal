import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard,
  Briefcase,
  Bookmark,
  User,
  Building,
  LogOut,
  FolderOpen
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const role = user?.role;

  const links = {
    candidate: [
      { to: '/dashboard/candidate', label: 'Dashboard Overview', icon: <LayoutDashboard size={18} /> },
      { to: '/dashboard/candidate/applied', label: 'Applied Jobs', icon: <Briefcase size={18} /> },
      { to: '/dashboard/candidate/saved', label: 'Saved Jobs', icon: <Bookmark size={18} /> },
      { to: '/profile', label: 'My Profile', icon: <User size={18} /> },
    ],
    recruiter: [
      { to: '/dashboard/recruiter', label: 'Dashboard Overview', icon: <LayoutDashboard size={18} /> },
      { to: '/dashboard/recruiter/companies', label: 'My Companies', icon: <Building size={18} /> },
      { to: '/profile', label: 'My Profile', icon: <User size={18} /> },
    ],
    admin: [
      { to: '/dashboard/admin', label: 'Admin Panel', icon: <LayoutDashboard size={18} /> },
      { to: '/profile', label: 'My Profile', icon: <User size={18} /> },
    ]
  };

  const currentLinks = links[role] || [];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '30px',
      zIndex: 100
    }}>
      {/* Brand logo */}
      <div style={{ padding: '0 24px 30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FolderOpen style={{ color: 'var(--primary)' }} />
        <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          Career<span style={{ color: 'var(--primary)' }}>Forge</span>
        </span>
      </div>

      {/* Nav List */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 16px' }}>
        {currentLinks.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.to}
            end={link.to.includes('dashboard/')}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--primary-glow)' : 'transparent',
              transition: 'all var(--transition-fast)'
            })}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom controls */}
      <div style={{ padding: '24px', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--danger)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            width: '100%',
            padding: '10px'
          }}
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
