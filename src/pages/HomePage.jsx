import React, { useState } from "react";
import { controller } from "../assets";
import { Equal } from "lucide-react";

import GameContent from "../components/GameContent";
import BottomNavigation from "../components/BottomNavigation";
import { logout } from "../utils/auth"; 
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);


  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden pb-24">

      {/* ✅ Header */}
      <div className="relative z-50 flex justify-between items-center px-6 pt-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={controller} alt="Logo" className="w-[35px] h-[25px]" />
          <span className="text-white text-2xl font-bold tracking-wider">
            GAMEZONE
          </span>
        </div>

        {/* ✅ Desktop Profile + Logout */}
        <div className="hidden md:flex items-center gap-4 text-white">
          <button className="bg-gray-700 px-3 py-1 rounded-lg">Profile</button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition-all"
          >
            Logout
          </button>
        </div>

        {/* ✅ Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-all border-2 border-white"
        >
          <Equal className="text-white" />
        </button>

        {/* ✅ Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute top-16 right-6 text-lg bg-slate-800 text-white px-6 py-3 rounded-lg shadow-xl border border-gray-700 md:hidden animate-fadeIn">
            <button className="block w-full text-left py-2 hover:text-blue-400">
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left py-2 hover:text-blue-400"
            >
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
