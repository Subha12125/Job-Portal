import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePassword, validatePhone } from '../../utils/validators';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'candidate',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Please enter a valid phone number';
    if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 8 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const registeredUser = await register(formData);
      navigate(`/dashboard/${registeredUser.role}`, { replace: true });
    } catch (err) {
      setApiError(err.message || 'Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)', padding: '20px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '40px' }}>
        <h2 className="title-md" style={{ textAlign: 'center', marginBottom: '8px' }}>Create Account</h2>
        <p className="text-muted" style={{ textAlign: 'center', marginBottom: '24px' }}>Start your career journey with CareerForge</p>

        {apiError && (
          <div style={{
            backgroundColor: 'var(--danger-bg)',
            color: 'var(--danger)',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.9rem',
            marginBottom: '20px',
            fontWeight: 500
          }}>
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
            {errors.name && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
            />
            {errors.email && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phone">Phone Number</label>
            <input
              className="form-control"
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="1234567890"
              required
            />
            {errors.phone && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="role">Register As</label>
            <select
              className="form-control form-select"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="candidate">Candidate (Job Seeker)</option>
              <option value="recruiter">Recruiter (Employer)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
            {errors.password && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.password}</span>}
          </div>

          <button className="btn btn-primary btn-lg" type="submit" style={{ width: '100%', marginTop: '12px' }} disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ fontWeight: 600 }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
