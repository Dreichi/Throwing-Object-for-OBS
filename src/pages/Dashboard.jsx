import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RewardForm from '../components/RewardForm';
import Navbar from '../components/Navbar';
import UpcomingFeatures from '../components/UpcomingFeatures';
import '../css/dashboard.css';

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
      <div className='dashboard'>
      <Navbar username={username} onLogout={handleLogout} />
      <div className='block block-user'>
        <p>Bienvenue {username} !</p>
      </div>
      <div className='block block-feature '>
        <UpcomingFeatures />
      </div>
        <div className='block block-params'>
        <p>
          Utilisez ce lien dans OBS :
          {' '}
          <span>{window.location.origin}/{username}</span>
        </p>
        <RewardForm username={username} customRewardId={customRewardId} onRewardIdSet={handleRewardIdSet} />
        </div>
        <div className='block block-video'>
          <h1>Comment utiliser ?</h1>
        <iframe width="80%" height="300px" src="https://www.youtube.com/embed/url_de_la_video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      <div className='block block-contact'>
      <h1>Me contacter</h1>
      <p>Discord: Louanyaa#3877</p>
      <a href="https://discord.gg/6tYCmPp7Bb">Serveur discord</a>
    </div>
      </div>
  );
};

export default Dashboard;
