import React from 'react';
import { FiMail, FiCalendar, FiUsers, FiCheckSquare } from 'react-icons/fi';
import './NavigationRail.css';

const navItems = [
  { id: 'mail', icon: FiMail, label: 'Mail' },
  { id: 'calendar', icon: FiCalendar, label: 'Calendar' },
  { id: 'people', icon: FiUsers, label: 'People' },
  { id: 'tasks', icon: FiCheckSquare, label: 'To Do' },
];

const NavigationRail = ({ activeApp, setActiveApp }) => {
  return (
    <nav className="nav-rail" role="navigation" aria-label="Application navigation">
      {navItems.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          className={`nav-rail-btn ${activeApp === id ? 'active' : ''}`}
          onClick={() => setActiveApp(id)}
          title={label}
          aria-label={label}
          aria-current={activeApp === id ? 'page' : undefined}
        >
          <Icon size={20} />
          <span className="nav-rail-label">{label}</span>
        </button>
      ))}
    </nav>
  );
};

export default NavigationRail;
