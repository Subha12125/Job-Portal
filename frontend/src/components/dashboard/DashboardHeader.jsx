import React, { useContext } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ThemeContext } from '../../context/ThemeContext';
import { Sun, Moon, Bell, User } from 'lucide-react';

const DashboardHeader = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header style={{
      height: '70px',
      backgroundColor: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      position: 'fixed',
      top: 0,
      right: 0,
      left: '260px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 30px',
      zIndex: 99
    }}>
      {/* Title */}
      <div>
        <h4 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-secondary)' }}>
          Welcome back, <span style={{ color: 'var(--text-primary)' }}>{user?.name || 'User'}</span>
        </h4>
      </div>

      {/* Quick Settings */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex' }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Separator */}
        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)' }}></div>

        {/* User Card */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-glow)',
              color: 'var(--primary)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <User size={18} />
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{user?.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
