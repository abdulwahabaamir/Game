import React, { useState } from "react";
import { controller } from "../assets";
import { Equal, User } from "lucide-react";

import GameContent from "../components/GameContent";
import BottomNavigation from "../components/BottomNavigation";
import { useAppContext } from '../context/useAppContext';
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAppContext();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden pb-24">


      <div className="relative z-50 flex justify-between items-center px-6 pt-6">


        <div className="flex items-center gap-3">
          <img src={controller} alt="Logo" className="w-[35px] h-[25px]" />
          <span className="text-white text-2xl font-bold tracking-wider">
            GAMEZONE
          </span>
        </div>


        <div className="hidden md:flex items-center gap-4 text-white">

          <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg border border-gray-700">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">{user?.mobile || "Guest"}</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all cursor-pointer"
          >
            Logout
          </button>
        </div>


        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition-all border-2 border-white"
        >
          <Equal className="text-white" />
        </button>


        {menuOpen && (
          <div className="absolute top-16 right-6 text-lg bg-slate-800 text-white px-6 py-4 rounded-lg shadow-xl border border-gray-700 md:hidden animate-fadeIn">

            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-700">
              <User className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">{user?.mobile || "Guest"}</span>
            </div>
            <button
              onClick={handleLogout}
              className="block w-full text-left py-2 hover:text-red-400 transition-colors"
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