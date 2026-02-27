import React, { useState, useEffect } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { isAuthenticated } from './services/auth';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('signup');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated()) {
      setAuthenticated(true);
      setCurrentView('dashboard');
    }
  }, []);

  const handleSignupSuccess = () => {
    setCurrentView('login');
  };

  const handleLoginSuccess = () => {
    setAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleSwitchToSignup = () => {
    setCurrentView('signup');
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setCurrentView('login');
  };

  // Render based on current view
  const renderView = () => {
    switch (currentView) {
      case 'signup':
        return (
          <Signup
            onSwitchToLogin={handleSwitchToLogin}
            onSignupSuccess={handleSignupSuccess}
          />
        );
      case 'login':
        return (
          <Login
            onSwitchToSignup={handleSwitchToSignup}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'dashboard':
        return <Dashboard onLogout={handleLogout} />;
      default:
        return (
          <Signup
            onSwitchToLogin={handleSwitchToLogin}
            onSignupSuccess={handleSignupSuccess}
          />
        );
    }
  };

  return (
    <div className="app">
      {renderView()}
    </div>
  );
}

export default App;
