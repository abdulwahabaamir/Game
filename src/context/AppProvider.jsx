import { useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import { createAuthToken, validateToken, logout as clearAuth } from "../utils/auth";
import { games } from "../data/gamesData";
import { navItems } from "../data/navData";
import { slides } from "../data/slidesData";

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (mobile) => {
    if (createAuthToken(mobile)) {
      setUser({ mobile });
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    clearAuth();
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkSession = () => {
      const data = validateToken();
      if (!data) {
        logout();
      } else {
        setUser({ mobile: data.mobile });
        setIsLoggedIn(true);
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider value={{ user, isLoggedIn, login, logout, games, navItems, slides }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
