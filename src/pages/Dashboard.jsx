import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RewardForm from '../components/RewardForm';

const Dashboard = ({ username }) => {
  const [customRewardId, setCustomRewardId] = useState(null);
  const navigate = useNavigate();

  const handleRewardIdSet = (rewardId) => {
    setCustomRewardId(rewardId);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('access_token'); 
    sessionStorage.removeItem('username');
    navigate('/');
    console.log('Déconnexion réussie');
  };

  return (
    <div>
      <div>
        <h1>Bienvenue, {username}!</h1>
        <p className="text-center mb-4">
          Utilisez ce lien dans OBS :
          {' '}
          <span>{window.location.origin}/{username}</span>
        </p>
        <RewardForm username={username} customRewardId={customRewardId} onRewardIdSet={handleRewardIdSet} />
        <button
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
