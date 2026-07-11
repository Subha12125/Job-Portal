import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePhone } from '../../utils/validators';
import { User, FileText, MapPin, Award, BookOpen, UserCheck } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    headline: '',
    bio: '',
    location: '',
    education: '',
    experience: '',
    skills: '',
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [apiError, setApiError] = useState('');

  // Sync state with authenticated user details
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        headline: user.headline || '',
        bio: user.bio || '',
        location: user.location || '',
        education: user.education || '',
        experience: user.experience || '',
        skills: user.skills ? user.skills.join(', ') : '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    setSuccess('');
    setApiError('');
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setSuccess('');
    setApiError('');

    if (type === 'resume') {
      const allowedExtensions = ['pdf', 'doc', 'docx'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedExtensions.includes(fileExtension)) {
        setApiError('Invalid resume file type. Only PDF, DOC, and DOCX files are allowed.');
        e.target.value = ''; // clear input
        setResumeFile(null);
        return;
      }
      if (file.size > maxSize) {
        setApiError('Resume size exceeds the 5MB limit.');
        e.target.value = ''; // clear input
        setResumeFile(null);
        return;
      }
      setResumeFile(file);
    } else {
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedExtensions.includes(fileExtension)) {
        setApiError('Invalid image file type. Only JPG, JPEG, PNG, and WEBP files are allowed.');
        e.target.value = ''; // clear input
        setImageFile(null);
        return;
      }
      if (file.size > maxSize) {
        setApiError('Image size exceeds the 2MB limit.');
        e.target.value = ''; // clear input
        setImageFile(null);
        return;
      }
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');
    setApiError('');

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Please enter a valid phone number';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('headline', formData.headline);
      payload.append('bio', formData.bio);
      payload.append('location', formData.location);
      payload.append('education', formData.education);
      payload.append('experience', formData.experience);
      
      const skillsArray = formData.skills
        ? formData.skills.split(',').map((s) => s.trim()).filter((s) => s)
        : [];
      
      skillsArray.forEach((skill) => payload.append('skills[]', skill));

      if (resumeFile) {
        payload.append('resume', resumeFile);
      }
      if (imageFile) {
        payload.append('profileImage', imageFile);
      }

      await updateProfile(payload);
      setSuccess('Profile updated successfully!');
      // Clear files state after upload
      setResumeFile(null);
      setImageFile(null);
    } catch (err) {
      setApiError(err.message || 'Error updating profile');
    }
  };

  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '30px' }}>
        {/* Left Side: Summary & Quick Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ textAlign: 'center', padding: '30px 20px' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)' }}
                />
              ) : (
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--surface-hover)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  margin: '0 auto'
                }}>
                  <User size={60} />
                </div>
              )}
            </div>

            <h2 className="title-sm" style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{user?.name}</h2>
            <p className="text-muted" style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '16px', textTransform: 'capitalize' }}>
              {user?.role}
            </p>
            {user?.headline && <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>"{user.headline}"</p>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', fontSize: '0.85rem', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--text-secondary)' }}>
                <MapPin size={16} style={{ flexShrink: 0 }} />
                <span>{user?.location || 'Location not specified'}</span>
              </div>
              {user?.isVerified && (
                <div style={{ display: 'flex', gap: '8px', color: 'var(--success)', fontWeight: 600 }}>
                  <UserCheck size={16} />
                  <span>Verified Professional</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Resume Link Card */}
          {user?.resume && (
            <div className="card" style={{ padding: '20px' }}>
              <h3 className="title-sm" style={{ fontSize: '0.95rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} style={{ color: 'var(--primary)' }} />
                <span>Uploaded Resume</span>
              </h3>
              <a
                href={user.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ width: '100%' }}
              >
                View Resume
              </a>
            </div>
          )}
        </div>

        {/* Right Side: Profile Forms */}
        <div className="card" style={{ padding: '40px' }}>
          <h1 className="title-md" style={{ marginBottom: '8px' }}>Profile Information</h1>
          <p className="text-muted" style={{ marginBottom: '30px' }}>Set up your personal details, professional statement, and documents</p>

          {success && (
            <div style={{
              backgroundColor: 'var(--success-bg)',
              color: 'var(--success)',
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '20px'
            }}>{success}</div>
          )}

          {apiError && (
            <div style={{
              backgroundColor: 'var(--danger-bg)',
              color: 'var(--danger)',
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '20px'
            }}>{apiError}</div>
          )}

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h3 className="title-sm" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '20px' }}>Account Settings</h3>
            
            <div className="grid grid-cols-2" style={{ gap: '20px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  required
                />
                {errors.phone && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="location">Location</label>
                <input
                  className="form-control"
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. San Francisco, CA"
                />
              </div>
            </div>

            <h3 className="title-sm" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '20px', marginTop: '30px' }}>Professional Details</h3>
            
            <div className="form-group">
              <label className="form-label" htmlFor="headline">Headline</label>
              <input
                className="form-control"
                type="text"
                id="headline"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="e.g. Senior Software Engineer | React & Node.js"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="bio">Professional Summary (Bio)</label>
              <textarea
                className="form-control"
                id="bio"
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Describe your career goals, motivations, and professional highlights..."
                style={{ resize: 'vertical' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="skills">Skills (Comma-separated)</label>
              <input
                className="form-control"
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="JavaScript, React, Node.js, AWS, MongoDB"
              />
            </div>

            <div className="grid grid-cols-2" style={{ gap: '20px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="experience">Professional Experience</label>
                <textarea
                  className="form-control"
                  id="experience"
                  name="experience"
                  rows="3"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 3 years at Acme Corp as Frontend developer"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="education">Education</label>
                <textarea
                  className="form-control"
                  id="education"
                  name="education"
                  rows="3"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="e.g. B.S. in Computer Science, Stanford University"
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>

            <h3 className="title-sm" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '20px', marginTop: '30px' }}>Upload Documents</h3>
            
            <div className="grid grid-cols-2" style={{ gap: '20px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="profileImageFile">Change Profile Image</label>
                <input
                  className="form-control"
                  type="file"
                  id="profileImageFile"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'image')}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="resumeFile">Update Resume (PDF, DOCX)</label>
                <input
                  className="form-control"
                  type="file"
                  id="resumeFile"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, 'resume')}
                />
              </div>
            </div>

            <button className="btn btn-primary btn-lg" type="submit" style={{ marginTop: '30px', float: 'right' }} disabled={loading}>
              {loading ? 'Saving Changes...' : 'Save Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
