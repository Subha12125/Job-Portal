import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: '1 0 auto', paddingTop: '80px', paddingBottom: '40px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
