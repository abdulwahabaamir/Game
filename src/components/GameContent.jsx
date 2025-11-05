import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';
import { tictac, Play, AI, Stars, pumpkin, YellowStar } from "../assets";
import { games } from "../data/gamesData";
import { slides } from "../data/slidesData";
const GameCarousel = () => {
  const AUTO_SLIDE_INTERVAL = 3000;

  // State and handlers
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative z-10 mt-8">
      {/* Game Carousel */}
      <div className="relative mb-8 group px-6">
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="min-w-full relative">
                <div className="aspect-[4/3] md:aspect-[16/9] lg:aspect-[2.5/1] xl:aspect-[3/1] relative overflow-hidden rounded-2xl lg:max-h-[450px]">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 "
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 "
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${index === currentSlide ? 'w-8 bg-blue-500' : 'w-2 bg-gray-500'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>



      {/* Tic Tac Toe Text Content */}
      <div className="text-center text-white space-y-2 px-6">
        <p className="text-base md:text-2xl font-normal">THE GAMES YOU LOVE</p>
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold">PLAY AND WIN</p>
        <p className='text-lg sm:text-2xl'>JOIN MILLIONS OF PLAYERS IN PAKISTAN.</p>
      </div>

      {/* Tic Tac Toe section */}
      <div className="w-full max-w-lg mx-auto my-6 px-4 sm:px-6">
        <div className="rounded-3xl shadow-2xl bg-black overflow-hidden border-white border-2">
          <div className="relative">
            <img
              src={tictac}
              alt="Tic Tac Toe"
              className="w-full h-auto rounded-t-3xl object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="text-center py-4 px-4 sm:py-6 sm:px-6">
            <p className="text-xs sm:text-sm md:text-base tracking-widest uppercase text-white">
              Challenge a friend in Tic-Tac-Toe!
            </p>

            <h2 className="text-base sm:text-xl font-bold text-white leading-tight mt-2">
              ULTIMATE BATTLE OF WITS,<br />
              CAN YOU OUTSMART YOUR OPPONENT?
            </h2>

            {/* Play Button */}
            <button className="mx-auto flex items-center justify-center gap-2 bg-[#0c6899] hover:bg-[#07496d] cursor-pointer  mt-4 sm:mt-6 py-2.5 sm:py-3 px-2 sm:px-8 rounded-lg transition-all transform hover:scale-105 text-white font-semibold text-xs sm:text-sm md:text-base">
              START PLAYING NOW
              <img src={Play} alt="Play Icon" className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Chat Bot Text */}
      <div className="text-center text-white space-y-2 px-6 mb-8 mt-20">
        <p className="text-xl md:text-2xl lg:text-3xl font-bold">NOW WITH AI AT YOUR SIDE</p>
        <p className='text-xl'>GET INSTANT GAME TIPS, RULES, AND <br /> CATEGORIES FROM OUR AI GAME CHAT BOTS</p>
      </div>

      {/* AI Chat Bot Section */}
      <div className="w-full max-w-lg mx-auto my-6 px-4 sm:px-6">
        <div className="rounded-3xl shadow-2xl bg-gradient-to-b from-[#101B2F] to-[#050914] overflow-hidden relative border-white border-2">
          <img src={Stars} alt="" className="absolute top-5 right-5" />
          <div className="relative">
            <img
              src={AI}
              alt="AI"
              className="w-auto h-auto rounded-t-3xl object-cover mt-16 mx-auto"
            />
          </div>

          {/* Text Content */}
          <div className=" py-4 px-4 sm:py-6 sm:px-6">
            <p className="text-xs sm:text-sm md:text-base tracking-widest uppercase text-white">
              Your gaming guide and strategist!
            </p>

            <h2 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-tight my-2 uppercase">
              Ask about rules, tips, and<br />winning moves
            </h2>
            <p className="text-xs sm:text-sm md:text-base font-normal tracking-widest uppercase text-white">
              And get instant answers.<br />
              Start chatting now and level up your game!
            </p>

            {/* Play Button */}
            <button className="flex items-center justify-center gap-2 bg-[#0c6899] hover:bg-[#07496d] cursor-pointer  mt-4 sm:mt-6 py-2.5 sm:py-3 px-2 sm:px-8 rounded-lg transition-all transform hover:scale-105 text-white font-semibold text-xs sm:text-sm md:text-base mx-auto">
              CHAT NOW
              <img src={Play} alt="Play Icon" className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>


      <div className="w-full px-4 sm:px-6 py-8 space-y-8">
        {/* Categories Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide">
              CATEGORIES
            </h2>

            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <button className="bg-white hover:bg-gray-200 p-2 sm:p-3 rounded-full cursor-pointer transition-all ">
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 p-2 sm:p-3 rounded-full cursor-pointer transition-all ">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button className="px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-md font-semibold  bg-blue-500 text-white border border-white transition-all hover:bg-blue-600 cursor-pointer">
              Action
            </button>
            <button className="px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-md font-semibold  bg-blue-500 text-white border border-white transition-all hover:bg-blue-600 cursor-pointer">
              Sports
            </button>
            <button className="px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-md font-semibold  bg-blue-500 text-white border border-white transition-all hover:bg-blue-600 cursor-pointer">
              Racing
            </button>
            <button className="px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-md font-semibold  bg-blue-500 text-white border border-white transition-all hover:bg-blue-600 cursor-pointer">
              Puzzle
            </button>
          </div>
        </div>

        {/* Browse All Games Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide">
              BROWSE ALL GAMES
            </h2>

            {/* Arrow Button */}
            <button className="bg-blue-500 hover:bg-blue-600 p-2 sm:p-3 rounded-full cursor-pointer transition-all ">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>

          {/* Game of the Day Card */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-white/20">
            {/* Background Image */}
            <div className="relative h-48 sm:h-56 md:h-64">
              <img
                src={pumpkin}
                alt="pumpking"
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
              <div>
                <p className="text-white/80 text-xs sm:text-sm font-semibold tracking-wider uppercase">
                  Game of the Day
                </p>
                <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mt-1">
                  GAME NAME
                </h3>
              </div>

              <div className="flex items-center justify-between">
                {/* Play Button */}
                <button className="flex items-center gap-2 transition-all transform hover:scale-105 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base transition-all shadow-lg">
                  PLAY NOW
                  <img src={Play} alt="Play" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Star Rating */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <img src={YellowStar} alt="Star" className="w-5 h-5 sm:w-6 sm:h-6" key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 sm:px-6 py-10">
        {/* Section Header */}
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide mb-6">
          SELECTED FOR YOU
        </h2>

        {/* Games List */}
        <div className="space-y-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="flex items-center gap-3 sm:gap-4 bg-black/40 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/10 hover:border-white/20 transition-all"
            >
              {/* Game Image */}
              <div className="flex-shrink-0">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
                />
              </div>

              {/* Game Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm sm:text-base md:text-lg font-bold mb-1 truncate">
                  {game.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(game.rating)].map((_, index) => (
                    <img
                      key={index}
                      src={YellowStar}
                      alt="star"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col items-end sm:items-center gap-2 sm:gap-4">
                {/* Play Button */}
                <button className="bg-[#0c6899] hover:bg-[#07496d] transition-all transform hover:scale-105 cursor-pointer text-white font-semibold px-4 sm:px-10 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ">
                  PLAY
                </button>

                {/* Add to Favourite */}
                <button className="flex items-center gap-1.5 text-white/80 transition-all">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 hover:fill-red-500 cursor-pointer transition-all" />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                    ADD TO FAVOURITE
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default GameCarousel;