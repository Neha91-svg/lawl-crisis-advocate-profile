import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isHome = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LEFT SIDE */}
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="AdvocateHub Logo" className="navbar-logo" />
            <span>AdvocateHub</span>
          </Link>

          <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
            <Link to="/advocates" className="nav-link">Find Advocate</Link>
            
            {user && (
              <>
                <Link to="/my-consultations" className="nav-link">My Consultations</Link>
                <Link to="/resources" className="nav-link">Resource Hub</Link>
              </>
            )}

            {isHome && (
              <>
                <a href="#rights" className="nav-link">Know Your Rights</a>
                <a href="#tips" className="nav-link">Legal Tips</a>
              </>
            )}
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