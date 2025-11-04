import React, { useState } from 'react';
import { controller } from "../assets";

import GameCarousel from '../components/GameCarousel';
import BottomNavigation from '../components/BottomNavigation';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden pb-24">


      {/* Header with Menu Button */}
      <div className="relative z-10 flex justify-between items-center px-6 pt-6">
        <div className="flex items-center gap-3">
                      <img src={controller} alt="" className='w-[35px] h-[25px]'/>     
          <span className="text-white text-2xl font-bold tracking-wider">GAMEZONE</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-all">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Main Content - Game Carousel */}
      <GameCarousel />

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default HomePage;