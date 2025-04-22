import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';
import miboLogo from '../media/Miibo.png';

const Navbar = ({ cartCount, onSearchChange, onLoginClick, user, onLogout }) => {
  const [showSearch, setShowSearch] = useState(false);
  
  // Safely get user data
  const getUserData = () => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  const userData = getUserData() || user;
  const isLoggedIn = !!localStorage.getItem('token');

  console.log('Navbar state:', { isLoggedIn, userData });

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={miboLogo} alt="Miibo" className="logo-img" />
          <span className="logo-text">Miibo</span>
        </Link>

        <div className="navbar-search">
          <div className={`search-container ${showSearch ? 'active' : ''}`}>
            <input
              type="text"
              placeholder="Search amiibo..."
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
            <FaSearch className="search-icon" onClick={() => setShowSearch(!showSearch)} />
          </div>
        </div>

        <div className="navbar-actions">
          {isLoggedIn && userData ? (
            <div className="user-menu">
              <span className="user-name">{userData.nombre_usuario}</span>
              <button className="logout-button" onClick={onLogout}>
                <FaSignOutAlt />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button className="login-button" onClick={onLoginClick}>
              <FaUser />
              <span>Sign In</span>
            </button>
          )}

          <Link to="/cart" className="cart-button">
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="cart-count" key={cartCount}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 