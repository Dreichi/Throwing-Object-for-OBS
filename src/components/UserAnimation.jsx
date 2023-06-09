// UserAnimation.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ImageAnimation from './ImageAnimation';

const UserAnimation = () => {
  const { username } = useParams();
  const { hitboxVisible } = useParams();

  return (
    <div>
      <ImageAnimation username={username} hitboxVisible={hitboxVisible} />
    </div>
  );
};

export default UserAnimation;
