import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import { validateEmail } from '../../utils/validators';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      setSuccess('Password reset link sent to your email.');
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 200px)', padding: '20px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '40px' }}>
        <h2 className="title-md" style={{ textAlign: 'center', marginBottom: '8px' }}>Forgot Password</h2>
        <p className="text-muted" style={{ textAlign: 'center', marginBottom: '24px' }}>Enter your email and we'll send you a link to reset your password</p>

        {error && (
          <div style={{
            backgroundColor: 'var(--danger-bg)',
            color: 'var(--danger)',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.9rem',
            marginBottom: '20px',
            fontWeight: 500
          }}>{error}</div>
        )}

        {success && (
          <div style={{
            backgroundColor: 'var(--success-bg)',
            color: 'var(--success)',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.9rem',
            marginBottom: '20px',
            fontWeight: 500
          }}>{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              className="form-control"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <button className="btn btn-primary btn-lg" type="submit" style={{ width: '100%', marginTop: '12px' }} disabled={loading}>
            {loading ? 'Sending link...' : 'Send Reset Link'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem' }}>
          Back to <Link to="/login" style={{ fontWeight: 600 }}>Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
