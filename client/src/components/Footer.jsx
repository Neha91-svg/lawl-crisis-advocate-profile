import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-card)',
      borderTop: '1px solid var(--border-color)',
      padding: '2rem 15px',
      marginTop: 'auto',
      textAlign: 'center',
      color: 'var(--text-secondary)'
    }}>
      <div className="container">
        <h3 style={{ color: 'var(--primary-accent)', marginBottom: '1rem' }}>LexConnect</h3>
        <p style={{ marginBottom: '1rem' }}>
          Connecting you with trusted crisis advocates and legal professionals instantly.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <a href="#" className="nav-link">Privacy Policy</a>
          <a href="#" className="nav-link">Terms of Service</a>
          <a href="#" className="nav-link">Contact Us</a>
        </div>
        <p style={{ fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} LexConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
