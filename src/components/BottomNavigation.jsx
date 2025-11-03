import React from 'react';
import { Home, Download, Heart } from 'lucide-react';

const BottomNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="relative max-w-md mx-auto px-6 pb-6">
        <div className="bg-gradient-to-r from-blue-900/90 to-cyan-900/90 backdrop-blur-lg rounded-3xl px-6 py-4 shadow-2xl border border-blue-500/30">
          {/* AI Button (Centered, Above) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-8">
            <button className="bg-gradient-to-br from-cyan-400 to-blue-500 p-4 rounded-2xl shadow-2xl transform rotate-45 hover:scale-110 transition-all">
              <span className="block transform -rotate-45 text-white font-bold text-xl">AI</span>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex justify-around items-center">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === 'home' ? 'text-white' : 'text-blue-300/60'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">HOME</span>
            </button>

            <button
              onClick={() => setActiveTab('games')}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === 'games' ? 'text-white' : 'text-blue-300/60'
              }`}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 6v12h10V6h-2V4h-6v2H7zm4-2h2v2h-2V4zm0 14h2v-2h-2v2z"/>
                <path d="M3 10h2v4H3zm16 0h2v4h-2z"/>
              </svg>
              <span className="text-xs font-medium">ALL GAMES</span>
            </button>

            <div className="w-12"></div>

            <button
              onClick={() => setActiveTab('download')}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === 'download' ? 'text-white' : 'text-blue-300/60'
              }`}
            >
              <Download className="w-6 h-6" />
              <span className="text-xs font-medium">DOWNLOAD</span>
            </button>

            <button
              onClick={() => setActiveTab('favorite')}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === 'favorite' ? 'text-white' : 'text-blue-300/60'
              }`}
            >
              <Heart className="w-6 h-6" />
              <span className="text-xs font-medium">FAVORITE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;