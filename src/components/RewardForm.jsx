import React, { useState, useEffect } from 'react';
import { setUser, getUser } from '../database/db';

const RewardForm = ({ username, onRewardIdSet }) => {
  const [currentRewardId, setCurrentRewardId] = useState('');
  const [hitboxVisible, setHitboxVisible] = useState(true);

  const handleChange = (event) => {
    setCurrentRewardId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentRewardId) {
      await setUser(username, { customRewardId: currentRewardId, hitboxVisible: hitboxVisible });
      onRewardIdSet(currentRewardId);
    }
  };

  const handleHitboxVisibilityChange = (event) => {
    setHitboxVisible(event.target.checked);
  };

  async function getAppAccessToken() {
    const clientId = '6t0m3g0mijn4ncy9lzu7r7z5xz4yji';
    const clientSecret = '3lpe1pfuu6sls5q4nzv75nikpamz46';
  
    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      }),
    });
  
    const data = await response.json();
    if (data.access_token) {
      return data.access_token;
    } else {
      throw new Error('Failed to get app access token');
    }
  }
  

  const subscribeWebhook = async (rewardId) => {
    const appAccessToken = await getAppAccessToken();
    console.log(appAccessToken);
  
    const response = await fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
      method: 'POST',
      headers: {
        'Client-ID': '6t0m3g0mijn4ncy9lzu7r7z5xz4yji',
        'Authorization': `Bearer ${appAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'channel.channel_points_custom_reward_redemption.add',
        version: '1',
        condition: {
          broadcaster_user_id: sessionStorage.getItem('id'),
          reward_id: rewardId,
        },
        transport: {
          method: 'webhook',
          callback: `${window.location.origin}/api/webhooks`,
          secret: 'your_secret_string',
        },
      }),
    });
  
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser(username);
      if (userData && userData.customRewardId) {
        setCurrentRewardId(userData.customRewardId);
        onRewardIdSet(userData.customRewardId);
        if (userData.hasOwnProperty("hitboxVisible")) {
          setHitboxVisible(userData.hitboxVisible);
        }
      }
    };
    fetchData();
  }, [username, onRewardIdSet]);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="customRewardId">
          Entrez l'ID de la récompense personnalisée:
        </label>
        <input
          type="text"
          id="customRewardId"
          name="customRewardId"
          value={currentRewardId}
          onChange={handleChange}
        />
      </div>
  
      <div className="flex items-center">
        <label htmlFor="hitboxVisible">
          Visibilité de la hitbox :
        </label>
        <input
          type="checkbox"
          id="hitboxVisible"
          name="hitboxVisible"
          checked={hitboxVisible}
          onChange={handleHitboxVisibilityChange}
        />
      </div>
  
      <button
        type="submit"
      >
        Enregistrer
      </button>
    </form>
  );  
};

export default RewardForm;
