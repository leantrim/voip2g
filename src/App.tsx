import React, { Suspense } from "react";
import { Circle } from "better-react-spinkit";
import auth from "./services/authService";
import Main from "./Components/Main";
import "./App.css";

const Login = React.lazy(() => import("./Components/user/Login"));

function App() {
  if (!auth.getCurrentUser())
    return (
      <Suspense fallback={<Circle color="#e1b542" size={60} />}>
        <Login />
      </Suspense>
    );

  return <Main />;
}

export default App;
