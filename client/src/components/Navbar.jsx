import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          LexConnect
        </Link>

        <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
          ☰
        </button>

        <div className={`navbar-nav ${isOpen ? 'open' : ''}`}>

          <div className="search-bar">
            <input type="text" className="search-input" placeholder="Find Advocate..." />
          </div>

          <a href="#advocates" className="nav-link">Find Advocate</a>
          <a href="#rights" className="nav-link">Know Your Rights</a>
          <a href="#tips" className="nav-link">Legal Tips</a>

          <div className="nav-buttons d-flex align-items-center gap-2">
            {user ? (
              <>
                <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                  Hi, {user.name}
                </span>
                <button onClick={handleLogout} className="btn btn-outline">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
