import React, { useEffect, useState } from 'react';
import { companyApi } from '../../api/companyApi';
import CompanyCard from '../../components/company/CompanyCard';
import Modal from '../../components/common/Modal';
import CompanyForm from '../../components/company/CompanyForm';
import { Plus, Building } from 'lucide-react';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const fetchMyCompanies = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await companyApi.getMyCompanies();
      setCompanies(data.companies || data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching companies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCompanies();
  }, []);

  const handleCreateSubmit = async (formData) => {
    setError('');
    try {
      await companyApi.createCompany(formData);
      setIsModalOpen(false);
      fetchMyCompanies(); // Refresh company list
    } catch (err) {
      setError(err.response?.data?.message || 'Error registering company');
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 className="title-md" style={{ marginBottom: '8px' }}>Registered Companies</h1>
          <p className="text-muted">Register and manage company profiles for job postings</p>
        </div>
        
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={18} />
          <span>Add Company</span>
        </button>
      </div>

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

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
          <div className="spinner"></div>
        </div>
      ) : companies.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Building size={40} style={{ color: 'var(--text-secondary)', marginBottom: '16px' }} />
          <h3 className="title-sm" style={{ marginBottom: '10px' }}>No Companies Registered</h3>
          <p className="text-body" style={{ marginBottom: '20px', fontSize: '0.95rem' }}>You must register at least one company before you can create job postings.</p>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Register a Company</button>
        </div>
      ) : (
        <div className="grid grid-cols-3" style={{ gap: '20px' }}>
          {companies.map((company) => (
            <div key={company._id}>
              <CompanyCard company={company} />
            </div>
          ))}
        </div>
      )}

      {/* Add Company Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Company">
        <CompanyForm
          onSubmit={handleCreateSubmit}
          onCancel={() => setIsModalOpen(false)}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default Companies;
