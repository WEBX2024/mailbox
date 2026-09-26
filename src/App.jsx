import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login/Login';
import AppShell from './components/AppShell/AppShell';
import Mail from './pages/Mail/Mail';
import Calendar from './pages/Calendar/Calendar';
import People from './pages/People/People';
import Tasks from './pages/Tasks/Tasks';

function App() {
  const { isAuthenticated } = useAuth();
  const [activeApp, setActiveApp] = useState('mail');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAuthenticated) {
    return (
      <>
        <Login />
        <Toaster position="bottom-center" />
      </>
    );
  }

  const renderActiveApp = () => {
    switch (activeApp) {
      case 'mail':
        return <Mail searchQuery={searchQuery} />;
      case 'calendar':
        return <Calendar />;
      case 'people':
        return <People />;
      case 'tasks':
        return <Tasks />;
      default:
        return <Mail searchQuery={searchQuery} />;
    }
  };

  return (
    <>
      <AppShell
        activeApp={activeApp}
        setActiveApp={setActiveApp}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      >
        {renderActiveApp()}
      </AppShell>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-lg)',
            fontSize: '14px',
          },
        }}
      />
    </>
  );
}

export default App;
