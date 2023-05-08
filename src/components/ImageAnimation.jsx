import React, { useCallback, useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import tmi from 'tmi.js';
import { getUser } from '../database/db';

import image1 from '../images/1.png';
import image2 from '../images/2.png';
import image3 from '../images/3.png';

const ImageAnimation = ({ username }) => {
  const sceneRef = useRef(null);
  const [hitboxVisible, setHitboxVisible] = useState(null);
  const [customRewardId, setCustomRewardId] = useState(null);

  useEffect(() => {
    const fetchCustomRewardId = async () => {
      const userData = await getUser(username);
      if (userData && userData.customRewardId) {
        setCustomRewardId(userData.customRewardId);
      }
    };

    fetchCustomRewardId();
  }, [username]);

  useEffect(() => {
    const fecthHitboxVisibility = async () => {
      const userData = await getUser(username);
      if (userData && userData.hasOwnProperty("hitboxVisible")) {
        setHitboxVisible(userData.hitboxVisible);
      }
    }

    fecthHitboxVisibility();
  }, [hitboxVisible, username]);
  

  const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Runner = Matter.Runner;

  const engine = Engine.create();
  const runner = Runner.create();

  const spawnImage = useCallback(async () => {
    const imagesArray = [image1, image2, image3];

    const getRandomImageUrl = () => {
      const randomIndex = Math.floor(Math.random() * imagesArray.length);
      return imagesArray[randomIndex];
    };

    const randomImageUrl = getRandomImageUrl();

    const imageWidth = 100;
    const imageHeight = 200;
    const image = new Image(imageWidth, imageHeight);
    image.src = randomImageUrl;

    image.onload = () => {
      const spawnPositions = [
        { x: window.innerWidth - imageWidth, y: window.innerHeight / 10, force: { x: -0.5, y: 0.5 } },
        { x: window.innerWidth - imageWidth, y: window.innerHeight / 2, force: { x: -1.5, y: 0 } },
        { x: window.innerWidth / 2, y: window.innerHeight / 10, force: { x: 0, y: 0.5 } },
        { x: imageWidth, y: window.innerHeight / 2, force: { x: 1.5, y: 0 } },
        { x: imageWidth, y: window.innerHeight / 10, force: { x: 0.5, y: 0.5 } },
      ];

      const randomPosition = spawnPositions[Math.floor(Math.random() * spawnPositions.length)];

      const imageTexture = Matter.Bodies.rectangle(randomPosition.x, randomPosition.y, imageWidth, imageHeight, {
        chamfer: { radius: 5 },
        angle: Math.PI / 4,
        render: {
          sprite: {
            texture: image.src,
            xScale: 0.35,
            yScale: 0.35,
          },
        },
      });

      Matter.World.add(engine.world, [imageTexture]);
      Matter.Body.applyForce(imageTexture, imageTexture.position, randomPosition.force);

      const despawnDelay = Math.random() * 1000 + 4000;
      setTimeout(() => {
        Matter.World.remove(engine.world, imageTexture);
      }, despawnDelay);
    };
  }, [engine]);

  useEffect(() => {
    if (!username || !customRewardId) return;
    const twitchConfig = {
      options: {
        debug: true,
      },
      connection: {
        reconnect: true,
        secure: true,
      },
      channels: [username],
    };

    const twitchClient = new tmi.Client(twitchConfig);

    twitchClient.connect().catch(console.error);

    twitchClient.on('message', (channel, tags, message, self) => {
      if (self) return;
    
      const customRewardIdToTrigger = customRewardId;
    
      if (tags['custom-reward-id'] === customRewardIdToTrigger) {
        console.log('Channel points redeemed:', tags['custom-reward-id']);
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            spawnImage();
          }, i * 100);
        }
      }
    });
    

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
      },
    });

    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 10, {
      isStatic: true,
      render: { visible: true },
    });

    const humanHitbox = Bodies.rectangle(window.innerWidth / 2, window.innerHeight / 2, 100, 400, {
      isStatic: true,
      render: { visible: hitboxVisible },
    });
    
    

    World.add(engine.world, [ground, humanHitbox]);

    Runner.run(runner, engine);
    Render.run(render);

    return () => {
      twitchClient.disconnect();
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      engine.events = {};
    };
  }, [Bodies, Engine, Render, Runner, World, engine, runner, spawnImage, username, customRewardId, hitboxVisible]);


  return (
    <div className="image-animation-container">
      <div ref={sceneRef} className="image-animation-scene"></div>
    </div>
  );
};

export default ImageAnimation;