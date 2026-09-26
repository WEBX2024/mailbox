import React from 'react';
import Header from '../Header/Header';
import NavigationRail from '../NavigationRail/NavigationRail';
import './AppShell.css';

const AppShell = ({ activeApp, setActiveApp, searchQuery, setSearchQuery, children }) => {
  return (
    <div className="app-shell">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="app-body">
        <NavigationRail activeApp={activeApp} setActiveApp={setActiveApp} />
        <main className="app-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
