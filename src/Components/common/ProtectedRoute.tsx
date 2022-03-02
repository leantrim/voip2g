import { Redirect, Route } from "react-router";
import auth from "../../services/authService";
import Login from "../user/Login";

function ProtectedRoute({ component: Component, render, ...restProps }: any) {
  return (
    <Route
      {...restProps}
      render={(props) => {
        if (!auth.getCurrentUser()) return <Login />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoute;
