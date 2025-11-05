import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { controller } from "../assets";
import { Equal } from 'lucide-react';


import GameContent from '../components/GameContent';
import BottomNavigation from '../components/BottomNavigation';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("loginTime");

    // 🔹 If using Redux / Context → Clear authentication state
    // dispatch(logoutUser())

    window.location.href = "/login"; // redirect to login page
  };

  // ✅ Auto Logout if loginTime expired
  useEffect(() => {
    const loginTime = Cookies.get("loginTime");
    const expirationTime = 24 * 60 * 60 * 1000; // 1 day expiration
    if (loginTime) {
      const diff = Date.now() - Number(loginTime);
      if (diff > expirationTime) {
        logout();
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden pb-24">

      {/* ✅ Header */}
      <div className="relative z-50 flex justify-between items-center px-6 pt-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={controller} alt="" className='w-[35px] h-[25px]' />
          <span className="text-white text-2xl font-bold tracking-wider">GAMEZONE</span>
        </div>

        {/* ✅ Desktop — Profile + Logout */}
        <div className="hidden md:flex items-center gap-4 text-white">
          <button className="bg-gray-700 px-3 py-1 rounded-lg">Profile</button>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg cursor-pointer">
            Logout
          </button>
        </div>

        {/* ✅ Mobile — Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-all border-2 border-white"
        >
          <Equal className="text-white" />
        </button>

        {menuOpen && (
          <div className="absolute z-50 top-18 right-6 text-lg bg-slate-800 text-white px-6 py-3 rounded-lg shadow-xl md:hidden border border-gray-700">
            <button className="block w-full text-left py-2 cursor-pointer hover:text-blue-400">Profile</button>
            <button
              onClick={logout}
              className="block w-full text-left py-2 cursor-pointer hover:text-blue-400">
              Logout
            </button>
          </div>
        )}


      </div>

      <GameContent />
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default HomePage;
