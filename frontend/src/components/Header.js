import React from 'react';
import { FaShoppingCart, FaUser, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

const Header = ({ cartItems, isLoggedIn, onLoginClick, onCartClick, searchQuery, onSearchChange }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload(); // Recargar la página para resetear el estado
  };

  return (
    <header className="header">
      <div className="header-logo">
        <img src="/media/Miibo.png" alt="Miibo" />
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="header-buttons">
        <button className="cart-button" onClick={onCartClick}>
          <FaShoppingCart />
          <span className="cart-count">{cartItems.length}</span>
          <span className="button-text">Cart</span>
        </button>

        {isLoggedIn ? (
          <div className="user-section">
            <span className="user-name">{user.nombre_usuario}</span>
            <button className="logout-button" onClick={handleLogout}>
              <FaSignOutAlt />
              <span className="button-text">Cerrar Sesión</span>
            </button>
          </div>
        ) : (
          <button className="login-button" onClick={onLoginClick}>
            <FaUser />
            <span className="button-text">Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header; 