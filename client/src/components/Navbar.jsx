import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';
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

        {/* LEFT SIDE */}
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="LexConnect Logo" className="navbar-logo" />
            <span>LexConnect</span>
          </Link>

          <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
            <Link to="/advocates" className="nav-link">Find Advocate</Link>
            <a href="#rights" className="nav-link">Know Your Rights</a>
            <a href="#tips" className="nav-link">Legal Tips</a>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="nav-buttons">
          {user ? (
            <>
              <span className="user-name">Hi, {user.name}</span>
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

        {/* MOBILE TOGGLE */}
        <button className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </button>

      </div>
    </nav>
  );
}

export default Navbar;