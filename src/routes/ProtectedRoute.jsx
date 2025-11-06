import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAppContext();
  const location = useLocation();

  if (!isLoggedIn && location.pathname.startsWith("/home")) {
    return <Navigate to="/" replace />; 
  }

  if (isLoggedIn && (location.pathname !== "/home")) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
