import React, { useState, useEffect } from 'react';
import { validateEmail, validatePhone } from '../../utils/validators';

const CompanyForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    location: '',
    industry: '',
    size: '',
  });

  const [logoFile, setLogoFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        website: initialData.website || '',
        description: initialData.description || '',
        location: initialData.location || '',
        industry: initialData.industry || '',
        size: initialData.size || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleFileChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Company name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Please enter a valid phone number';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('phone', formData.phone);
    payload.append('website', formData.website);
    payload.append('description', formData.description);
    payload.append('location', formData.location);
    payload.append('industry', formData.industry);
    payload.append('size', formData.size);

    if (logoFile) {
      payload.append('companyLogo', logoFile);
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="grid grid-cols-2" style={{ gap: '20px' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Company Name</label>
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
          <label className="form-label" htmlFor="email">Official Email</label>
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
          <label className="form-label" htmlFor="phone">Contact Phone</label>
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
          <label className="form-label" htmlFor="website">Website URL</label>
          <input
            className="form-control"
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="description">About the Company</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          style={{ resize: 'vertical' }}
        />
      </div>

      <div className="grid grid-cols-3" style={{ gap: '20px' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="location">Headquarters Location</label>
          <input
            className="form-control"
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Chicago, IL"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="industry">Industry Sector</label>
          <input
            className="form-control"
            type="text"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="e.g. Technology, Health"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="size">Company Size</label>
          <input
            className="form-control"
            type="text"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="e.g. 50-100 employees"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="companyLogo">Upload Company Logo</label>
        <input
          className="form-control"
          type="file"
          id="companyLogo"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Company'}
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;
