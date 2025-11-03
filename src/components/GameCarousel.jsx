import React, { useState, useEffect } from 'react';
import { crousel1,crousel2,crousel3 } from "../assets";


const GameCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: crousel1,
      title: "REVIVE & CONQUER"
    },
    {
      image: crousel2 ,
      title: "BATTLE ROYALE"
    },
    {
      image: crousel3,
      title: "CYBER WARS"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-10 px-6 mt-8">
      {/* Game Carousel */}
      <div className="relative mb-8">
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="min-w-full relative">
                <div className="aspect-[4/3] relative overflow-hidden rounded-2xl">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <h2 className="absolute bottom-6 left-6 text-4xl font-black text-red-500 tracking-wider drop-shadow-lg">
                    {slide.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-gray-500'
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center text-white space-y-2">
        <p className="text-lg font-medium">THE GAMES YOU LOVE</p>
        <p className="text-3xl font-bold">PLAY AND WIN</p>
      </div>
    </div>
  );
};

export default GameCarousel;