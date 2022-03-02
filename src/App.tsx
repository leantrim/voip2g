import auth from "./services/authService";
import Login from "./Components/user/Login";
import Main from "./Components/Main";
import "./App.css";

function App() {
  if (!auth.getCurrentUser()) return <Login />;

  return <Main />;
}

export default App;
