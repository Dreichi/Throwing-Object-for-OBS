// AuthWrapper.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as RouterContainer, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './pages/Dashboard';
import UserAnimation from './components/UserAnimation';

const AuthWrapper = () => {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setAuthData({ username: savedUsername });
    }
  }, []);

  const handleAuth = (username) => {
    setAuthData({ username });
  };

  return authData ? (
    <Dashboard username={authData.username} />
  ) : (
    <AuthForm onAuth={handleAuth} />
  );
};

function Router() {
  return (
    <RouterContainer>
      <Routes>
        <Route path="/" element={<AuthWrapper />} />
        <Route path="/:username" element={<UserAnimation />} />
      </Routes>
    </RouterContainer>
  );
}

export default Router;
