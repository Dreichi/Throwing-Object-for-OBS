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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">Bienvenue, {username}!</h1>
        <p className="text-center mb-4">
          Utilisez ce lien dans OBS :
          {' '}
          <span className="text-indigo-600">{window.location.origin}/{username}</span>
        </p>
        <RewardForm username={username} customRewardId={customRewardId} onRewardIdSet={handleRewardIdSet} />
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
