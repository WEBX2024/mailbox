import React, { useState, useRef, useEffect } from 'react';
import { FiGrid, FiBell, FiSettings, FiHelpCircle, FiMoon, FiSun, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Search from '../Search/Search';
import './Header.css';

const Header = ({ searchQuery, setSearchQuery }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="header-icon-btn" aria-label="App launcher" title="App launcher">
          <FiGrid size={18} />
        </button>
        <span className="app-brand">Outlook</span>
      </div>

      <div className="header-center">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className="header-right">
        <button
          className="header-icon-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
        <button className="header-icon-btn" aria-label="Help" title="Help">
          <FiHelpCircle size={18} />
        </button>
        <button className="header-icon-btn" aria-label="Settings" title="Settings">
          <FiSettings size={18} />
        </button>
        <button className="header-icon-btn" aria-label="Notifications" title="Notifications">
          <FiBell size={18} />
          <span className="notification-badge">3</span>
        </button>

        <div className="profile-container" ref={profileRef}>
          <button
            className="profile-btn"
            onClick={() => setProfileOpen(!profileOpen)}
            aria-label="Account"
            title="Account"
          >
            <div className="header-avatar" style={{ backgroundColor: '#0078d4' }}>
              {user?.initials || 'U'}
            </div>
          </button>

          {profileOpen && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="profile-dropdown-avatar" style={{ backgroundColor: '#0078d4' }}>
                  {user?.initials || 'U'}
                </div>
                <div className="profile-dropdown-info">
                  <div className="profile-dropdown-name">{user?.name}</div>
                  <div className="profile-dropdown-email">{user?.email}</div>
                </div>
              </div>
              <div className="profile-dropdown-divider" />
              <button className="profile-dropdown-item" onClick={toggleTheme}>
                {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
                <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
              </button>
              <button className="profile-dropdown-item">
                <FiSettings size={16} />
                <span>Settings</span>
              </button>
              <div className="profile-dropdown-divider" />
              <button className="profile-dropdown-item danger" onClick={logout}>
                <FiLogOut size={16} />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
