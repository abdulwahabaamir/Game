import React, { useState } from 'react';
import { navItems } from "../data/navData";

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('home');

  

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur">
      <div className="w-full relative">
        {/* AI Button */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-10">
          <button className="w-16 h-16 border border-white bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center transform rotate-45 hover:scale-110 transition-transform border-2 border-blue-300/30">
            <span className="text-white font-bold text-xl -rotate-45">AI</span>
          </button>
        </div>

        {/* Nav Bar */}
        <div className="bg-[#2EB1FA]/30 rounded-t-4xl px-2 sm:px-6 py-5">
          {/* Nav Items */}
          <div className="flex justify-around items-center">
            {navItems.map((item) => {
              if (item.id === 'spacer') return <div key="spacer" className=" w-4 sm:w-12" />;
              
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center gap-2 transition-all min-w-[60px] ${
                    isActive ? 'text-cyan-400 scale-110' : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <img src={item.icon} alt="" className="size-5 sm:size-7" />
                  <span className="text-xs sm:text-md font-normal tracking-wider whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;