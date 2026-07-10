import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { companyApi } from '../../api/companyApi';
import CompanyForm from '../../components/company/CompanyForm';

const CompanyProfile = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await companyApi.getCompanyById(id);
        setCompany(data.company || data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error loading company details');
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  const handleUpdateSubmit = async (formData) => {
    setLoading(true);
    setError('');
    try {
      await companyApi.updateCompany(id, formData);
      navigate('/dashboard/recruiter/companies');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating company details');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !company) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in" style={{ padding: '40px' }}>
      <h1 className="title-md" style={{ marginBottom: '8px' }}>Edit Company Profile</h1>
      <p className="text-muted" style={{ marginBottom: '30px' }}>Update logo, contact info, and structural specifications of the organization</p>

      {error && (
        <div style={{
          backgroundColor: 'var(--danger-bg)',
          color: 'var(--danger)',
          padding: '12px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.9rem',
          fontWeight: 600,
          marginBottom: '20px'
        }}>{error}</div>
      )}

      {company && (
        <CompanyForm
          initialData={company}
          onSubmit={handleUpdateSubmit}
          onCancel={() => navigate('/dashboard/recruiter/companies')}
          loading={loading}
        />
      )}
    </div>
  );
};

export default CompanyProfile;
