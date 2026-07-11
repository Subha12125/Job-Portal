import React, { useEffect, useState } from 'react';
import { useJobs } from '../../hooks/useJobs';
import { userApi } from '../../api/userApi';
import DashboardStats from '../../components/dashboard/DashboardStats';
import { ShieldCheck, User, Users, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  const { jobs, fetchJobs } = useJobs();
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetchJobs();
    // In a production setup, we would fetch users here. Let's mock a simple fetch or set counts.
    setUserCount(12); // Mock count
  }, [fetchJobs]);

  const stats = [
    { label: 'Total Job Postings', value: jobs.length, icon: 'jobs' },
    { label: 'Active Users', value: userCount, icon: 'users' },
    { label: 'System Status', value: 'Operational', icon: 'companies' },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '30px' }}>
        <h1 className="title-md" style={{ marginBottom: '6px' }}>Admin Dashboard Panel</h1>
        <p className="text-muted">Monitor system metrics, evaluate job listings, and manage configurations</p>
      </div>

      <DashboardStats stats={stats} />

      <div className="card" style={{ padding: '30px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{
          display: 'inline-flex',
          padding: '16px',
          borderRadius: '50%',
          backgroundColor: 'var(--success-bg)',
          color: 'var(--success)'
        }}>
          <ShieldCheck size={32} />
        </div>
        <div>
          <h3 className="title-sm" style={{ marginBottom: '6px' }}>System Administrator Mode</h3>
          <p className="text-body" style={{ fontSize: '0.9rem' }}>
            You have full system access permissions to edit, remove, or approve job boards, recruiter profiles, and general portal listings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
