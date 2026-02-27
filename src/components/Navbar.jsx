import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__left">
        <img
          className="navbar__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
        />
        <ul className="navbar__links">
          <li className="navbar__link navbar__link--active">Home</li>
          <li className="navbar__link">TV Shows</li>
          <li className="navbar__link">Movies</li>
          <li className="navbar__link">New & Popular</li>
          <li className="navbar__link">My List</li>
        </ul>
      </div>
      <div className="navbar__right">
        <span className="navbar__icon">🔍</span>
        <span className="navbar__icon">🔔</span>
        <div className="navbar__profile">
          <span className="navbar__username">{user?.username}</span>
          <div 
            className="navbar__avatar-container"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              className="navbar__avatar"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="User Avatar"
            />
            <span className="navbar__dropdown-arrow">▼</span>
          </div>
          {showDropdown && (
            <div className="navbar__dropdown">
              <button className="navbar__logout" onClick={onLogout}>
                Sign out of Kodflix
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
