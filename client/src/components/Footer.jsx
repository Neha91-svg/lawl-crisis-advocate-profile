import React from 'react';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <h3 className="footer-brand">LexConnect</h3>
        <p className="footer-tagline">
          Connecting you with trusted legal professionals when it matters most.
        </p>
        <div className="footer-links">
          <a href="#" className="nav-link">Privacy Policy</a>
          <a href="#" className="nav-link">Terms of Service</a>
          <a href="#" className="nav-link">Contact Us</a>
        </div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} LexConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
