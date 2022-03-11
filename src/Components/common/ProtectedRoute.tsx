import { Route } from "react-router-dom";
import auth from "../../services/authService";
import Login from "../user/Login";

function ProtectedRoute({ component: Component, render, ...restProps }: any) {
  return (
    <Route
      {...restProps}
      render={(props: any) => {
        if (!auth.getCurrentUser()) return <Login />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoute;
