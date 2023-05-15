import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'
import Matter from 'matter-js';
import image1 from '../images/1.png';
import image2 from '../images/2.png';
import image3 from '../images/3.png';

const AuthForm = () => {
  const navigate = useNavigate();
  const sceneRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleTwitchAuth = () => {
    const authUrl = new URL('https://id.twitch.tv/oauth2/authorize');
    authUrl.searchParams.append('response_type', 'token');
    authUrl.searchParams.append('client_id', '6t0m3g0mijn4ncy9lzu7r7z5xz4yji');
    authUrl.searchParams.append('redirect_uri', 'http://localhost:3000/auth/callback');
    authUrl.searchParams.append('scope', 'user:read:email');
    window.location.href = authUrl.toString();
  };

  useEffect(() => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Runner = Matter.Runner;
  
    const engine = Engine.create();
    const runner = Runner.create();
  
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        wireframes: false,
        background: 'transparent',
      },
    });
  
    Runner.run(runner, engine);
    Render.run(render);
  
    const images = [];
  
    const imagesArray = [image1, image2, image3];
  
    const getRandomImageUrl = () => {
      const randomIndex = Math.floor(Math.random() * imagesArray.length);
      return imagesArray[randomIndex];
    };

    const intervalId = setInterval(() => {
      const randomImagePath = getRandomImageUrl();
    
      const img = new Image();
      img.src = randomImagePath;
      img.onload = () => {
        const spawnPositions = [
          { x: window.innerWidth - img.width, y: window.innerHeight / 10, force: { x: -1.5, y: 0.5 } },
          { x: window.innerWidth - img.width, y: window.innerHeight / 2, force: { x: -2.5, y: 0 } },
          { x: window.innerWidth / 2, y: window.innerHeight / 10, force: { x: 1, y: 0.5 } },
          { x: img.width, y: window.innerHeight / 2, force: { x: 2.5, y: 0 } },
          { x: img.width, y: window.innerHeight / 10, force: { x: 1.5, y: 0.5 } },
        ];
  
        const randomPosition = spawnPositions[Math.floor(Math.random() * spawnPositions.length)];

        const xScale = 0.5;
        const yScale = 0.5;
        
        const image = Bodies.rectangle(
          randomPosition.x,
          randomPosition.y,
          img.width * xScale,
          img.height * yScale,
          {
            render: {
              sprite: {
                texture: randomImagePath,
                xScale: xScale,
                yScale: yScale,
              },
            },
          }
        );
        

        const humanHitbox = Bodies.rectangle(window.innerWidth / 2, window.innerHeight / 2, 560, 360, {
          isStatic: true,
          render: { visible: false },
        });
        
        World.add(engine.world, [humanHitbox]);
    
        Matter.Body.applyForce(image, image.position, randomPosition.force);
        World.add(engine.world, [image]);
    
        setTimeout(() => {
          World.remove(engine.world, image);
          const imageIndex = images.indexOf(image);
          if (imageIndex > -1) {
            images.splice(imageIndex, 1);
          }
        }, Math.random() * 1000 + 7000);
      };
    }, 500);
  
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      engine.events = {};
      clearInterval(intervalId);
    };
  }, []);

  

  return (
    <div className='container'>
      <form className='form-login' onSubmit={handleSubmit}>
      <h1 className='title-login'>Bienvenue sur</h1>
      <h2 className='title-login'>SPANK !</h2>
        <button className='button-login' type="button" onClick={handleTwitchAuth}>
          Connexion
        </button>
      </form>
      <div ref={sceneRef} className="image-animation-scene"></div>
    </div>
  );
};

export default AuthForm;
