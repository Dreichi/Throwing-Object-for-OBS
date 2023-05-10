// AuthCallback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  const fetchUserData = async (accessToken) => {
    try {
      const response = await fetch('https://api.twitch.tv/helix/users', {
        headers: {
          'Client-ID': '6t0m3g0mijn4ncy9lzu7r7z5xz4yji',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        const { login, email } = data.data[0];
        sessionStorage.setItem('username', login);
        sessionStorage.setItem('email', email);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substr(1));
    const accessToken = hashParams.get('access_token');
  
    if (accessToken) {
      try {
        sessionStorage.setItem('access_token', accessToken);
        console.log('Access token set in sessionStorage:', accessToken);
        fetchUserData(accessToken).then(() => {
          // Dispatch the custom event when user data is stored in sessionStorage
          window.dispatchEvent(new Event('userLoaded'));
          console.log('Navigating to /dashboard...');
          navigate('/dashboard');
        });
      } catch (error) {
        console.error('Error setting sessionStorage:', error);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);
  

  return (
    <div>
      <p>Authentification en cours...</p>
    </div>
  );
};

export default AuthCallback;
