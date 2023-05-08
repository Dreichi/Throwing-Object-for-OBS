import React, { useState, useEffect } from 'react';
import { setUser, getUser } from '../database/db';

const RewardForm = ({ username, customRewardId, onRewardIdSet }) => {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="customRewardId" className="block text-sm font-medium text-gray-700">
          Entrez l'ID de la récompense personnalisée:
        </label>
        <input
          type="text"
          id="customRewardId"
          name="customRewardId"
          value={currentRewardId}
          onChange={handleChange}
          className="mt-1 block w-full py-2 px-3 border-2 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
        />
      </div>
  
      <div className="flex items-center">
        <label htmlFor="hitboxVisible" className="mr-2 block text-sm text-gray-700">
          Visibilité de la hitbox :
        </label>
        <input
          type="checkbox"
          id="hitboxVisible"
          name="hitboxVisible"
          checked={hitboxVisible}
          onChange={handleHitboxVisibilityChange}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
      </div>
  
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Enregistrer
      </button>
    </form>
  );  
};

export default RewardForm;
