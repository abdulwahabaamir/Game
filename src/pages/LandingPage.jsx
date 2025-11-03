import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameCarousel from '../components/GameCarousel';
import { controller } from "../assets";


const LandingPage = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">


      {/* Header with Join Button */}
      <div className="relative z-10 flex justify-between items-center px-6 pt-6">
        <div className="flex items-center gap-3">
            <img src={controller} alt="" className='w-[35px] h-[25px]'/>     
          <span className="text-white text-2xl font-bold tracking-wider">GAMEZONE</span>
        </div>
        <button
          onClick={handleJoinClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 cursor-pointer"
        >
          JOIN NOW
        </button>
      </div>

      {/* Main Content - Game Carousel */}
      <GameCarousel />
    </div>
  );
};

export default LandingPage;
