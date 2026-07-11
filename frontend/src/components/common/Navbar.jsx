import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ThemeContext } from '../../context/ThemeContext';
import { Sun, Moon, LogOut, Briefcase, User, Menu, X, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    return `/dashboard/${user.role}`;
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '70px',
      backgroundColor: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      transition: 'background-color var(--transition-normal)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
          <Briefcase style={{ color: 'var(--primary)' }} />
          <span>Career<span style={{ color: 'var(--primary)' }}>Forge</span></span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }} className="desktop-menu">
          <Link to="/jobs" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Find Jobs</Link>
          
          <button 
            onClick={toggleTheme} 
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            title="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Link to={getDashboardLink()} className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 500 }}>
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <User size={20} />
                )}
                <span>Profile</span>
              </Link>
              <button onClick={handleLogout} className="btn btn-danger btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">Log In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          className="mobile-menu-trigger"
          onClick={() => setMobileMenuOpen(prev => !prev)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          style={{
            display: 'none',          /* shown via CSS media query */
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '8px',
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile slide-out overlay backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            top: '70px',
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 999,
          }}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-out panel */}
      <div
        style={{
          position: 'fixed',
          top: '70px',
          right: 0,
          bottom: 0,
          width: '270px',
          backgroundColor: 'var(--surface)',
          borderLeft: '1px solid var(--border)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '24px 20px',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowY: 'auto',
        }}
        aria-hidden={!mobileMenuOpen}
      >
        <Link
          to="/jobs"
          onClick={() => setMobileMenuOpen(false)}
          style={{ fontWeight: 500, color: 'var(--text-secondary)', padding: '10px 0', borderBottom: '1px solid var(--border)' }}
        >
          Find Jobs
        </Link>

        <button
          onClick={() => { toggleTheme(); }}
          style={{
            background: 'none', border: 'none',
            color: 'var(--text-primary)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '10px',
            fontWeight: 500, padding: '10px 0',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>

        {isAuthenticated ? (
          <>
            <Link
              to={getDashboardLink()}
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}
            >
              <LayoutDashboard size={16} /> Dashboard
            </Link>
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 500, padding: '10px 0' }}
            >
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <User size={18} />
              )}
              Profile
            </Link>
            <button
              onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
              className="btn btn-danger btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}
            >
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '8px' }}
            >
              Log In
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary btn-sm"
              style={{ marginTop: '8px' }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
