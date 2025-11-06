import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameContent from '../components/GameContent';
import { controller } from "../assets";


const LandingPage = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/login');
  };


  return (
    <div className="min-h-screen bg-[#1E1E1E] relative overflow-hidden">


      {/* Header with Join Button */}
      <div className="relative z-10 flex justify-between items-center px-6 pt-6">
        <div className="flex items-center gap-3">
            <img src={controller} alt="" className='w-[35px] h-[25px]'/>     
          <span className="text-white text-2xl font-bold tracking-wider">GAMEZONE</span>
        </div>
        <button
          onClick={handleJoinClick}
          className="border-2 border-white bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 cursor-pointer"
        >
          JOIN NOW
        </button>
      </div>

      {/* Main Content */}
      <GameContent />
    </div>
  );
};

export default LandingPage;
