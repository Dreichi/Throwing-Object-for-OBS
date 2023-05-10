import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './pages/Dashboard';
import UserAnimation from './components/UserAnimation';
import AuthCallback from './components/AuthCallback';

const AuthHandler = () => {
  const [authData, setAuthData] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    const accessToken = sessionStorage.getItem('access_token');
    if (storedUsername && accessToken) {
      setAuthData({ username: storedUsername });
      setUserLoaded(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);

    const storedUsername = sessionStorage.getItem('username');
    const accessToken = sessionStorage.getItem('access_token');
    if (storedUsername && accessToken) {
      setAuthData({ username: storedUsername });
      setUserLoaded(true);
    }
    setLoading(false);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/:username" element={<UserAnimation />} />
      <Route
        path="/dashboard"
        element={
          loading ? (
            <h1>Chargement...</h1>
          ) : userLoaded ? (
            authData ? (
              <Dashboard username={authData.username} />
            ) : (
              <h1>Accès non autorisé</h1>
            )
          ) : (
            <h1>Accès non autorisé</h1>
          )
        }
      />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  );
};



const AppRouter = () => {
  return (
    <Router>
      <AuthHandler />
    </Router>
  );
};

export default AppRouter;
