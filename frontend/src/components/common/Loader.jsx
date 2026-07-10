import React from 'react';

const Loader = ({ fullPage = false }) => {
  const containerStyle = fullPage
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'var(--background)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }
    : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 0',
      };

  return (
    <div style={containerStyle}>
      <div className="spinner" style={{ width: '40px', height: '40px' }}></div>
    </div>
  );
};

export default Loader;
