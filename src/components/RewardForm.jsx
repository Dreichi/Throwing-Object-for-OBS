import React, { useState, useEffect } from 'react';
import { setUser, getUser } from '../database/db';

const RewardForm = ({ username, customRewardId, onRewardIdSet }) => {
  const [currentRewardId, setCurrentRewardId] = useState('');

  const handleChange = (event) => {
    setCurrentRewardId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentRewardId) {
      await setUser(username, { customRewardId: currentRewardId });
      onRewardIdSet(currentRewardId);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser(username);
      if (userData && userData.customRewardId) {
        setCurrentRewardId(userData.customRewardId);
        onRewardIdSet(userData.customRewardId);
      }
    };
    fetchData();
  }, [username, onRewardIdSet]);

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default RewardForm;
