// AuthForm.js
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleTwitchAuth = () => {
    const authUrl = new URL('https://id.twitch.tv/oauth2/authorize');
    authUrl.searchParams.append('response_type', 'token');
    authUrl.searchParams.append('client_id', '6t0m3g0mijn4ncy9lzu7r7z5xz4yji');
    authUrl.searchParams.append('redirect_uri', 'https://throwing-by-louanyaa.netlify.app/auth/callback');
    authUrl.searchParams.append('scope', 'user:read:email');
    window.location.href = authUrl.toString();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={handleTwitchAuth}>
        Se connecter à Twitch
      </button>
    </form>
  );
};

export default AuthForm;

