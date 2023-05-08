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
    localStorage.removeItem('username');
    navigate('/');
    window.location.reload();
  };


  return (
    <div>
      <h1>Bienvenue, {username}!</h1>
      <p>
        Utilisez ce lien dans OBS :
        {' '}
        {window.location.origin}/{username}
      </p>
      <RewardForm username={username} customRewardId={customRewardId} onRewardIdSet={handleRewardIdSet} />
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
};

export default Dashboard;
