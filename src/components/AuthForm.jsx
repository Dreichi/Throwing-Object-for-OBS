import React, { useState, useEffect } from 'react';


const AuthForm = ({ onAuth }) => {
    const [username, setUsername] = useState('');
  
    useEffect(() => {
      const savedUsername = localStorage.getItem('username');
      if (savedUsername) {
        setUsername(savedUsername);
      }
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      localStorage.setItem('username', username);
      onAuth(username);
    };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom d'utilisateur twitch :
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default AuthForm;
