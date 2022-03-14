import { Navigate, Outlet } from "react-router-dom";
import auth from "../../services/authService";

const PrivateRoute = () => {
  const authed = auth.getCurrentUser(); // determine if authorized, from context or
  return authed ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
