import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Public pages
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Jobs from '../pages/jobs/Jobs';
import JobDetails from '../pages/jobs/JobDetails';

// Candidate & Shared Auth pages
import Profile from '../pages/profile/Profile';
import AppliedJobs from '../pages/jobs/AppliedJobs';
import SavedJobs from '../pages/jobs/SavedJobs';

// Company pages
import Companies from '../pages/company/Companies';
import CompanyProfile from '../pages/company/CompanyProfile';

// Dashboards
import CandidateDashboard from '../pages/dashboard/CandidateDashboard';
import RecruiterDashboard from '../pages/dashboard/RecruiterDashboard';
import AdminDashboard from '../pages/dashboard/AdminDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Pages */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        
        {/* Protected general page routes */}
        <Route path="profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Route>

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Candidate Dashboard */}
        <Route path="candidate" element={
          <ProtectedRoute allowedRoles={['candidate']}>
            <CandidateDashboard />
          </ProtectedRoute>
        } />
        <Route path="candidate/applied" element={
          <ProtectedRoute allowedRoles={['candidate']}>
            <AppliedJobs />
          </ProtectedRoute>
        } />
        <Route path="candidate/saved" element={
          <ProtectedRoute allowedRoles={['candidate']}>
            <SavedJobs />
          </ProtectedRoute>
        } />

        {/* Recruiter Dashboard */}
        <Route path="recruiter" element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <RecruiterDashboard />
          </ProtectedRoute>
        } />
        <Route path="recruiter/companies" element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <Companies />
          </ProtectedRoute>
        } />
        <Route path="recruiter/companies/:id" element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <CompanyProfile />
          </ProtectedRoute>
        } />

        {/* Admin Dashboard */}
        <Route path="admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
