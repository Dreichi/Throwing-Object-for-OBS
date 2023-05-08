// UserAnimation.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ImageAnimation from './ImageAnimation';

const UserAnimation = () => {
  const { username } = useParams();

  return (
    <div>
      <ImageAnimation username={username} />
    </div>
  );
};

export default UserAnimation;
