import { Navigate, Outlet } from "react-router-dom";
import auth from "../../services/authService";

const PrivateRoute = () => {
  const authed = auth.getCurrentUser(); // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return authed ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
