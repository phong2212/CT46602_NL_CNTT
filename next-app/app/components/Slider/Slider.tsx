'use client'

import React, { useEffect, useState } from 'react';

const backgrounds = [
  "/img/bg1.jpg",
  "/img/bg2.jpg",
  "/img/bg3.jpg",
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % backgrounds.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="carousel w-full h-screen absolute inset-0 -z-10 overflow-hidden">
      {backgrounds.map((background, index) => (
        <div key={index} className={`carousel-item w-full ${index === currentIndex ? '' : 'hidden'}`}>
          <img
            src={background}
            className="w-full"
            alt={`background${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Slider;
