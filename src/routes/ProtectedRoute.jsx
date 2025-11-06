import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAppContext();

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
