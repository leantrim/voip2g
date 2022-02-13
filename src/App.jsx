import React from "react";
import "./App.css";
import { logo } from "./config.json";

function App() {
  return (
    <div className="app">
      <h1>App</h1>
      <img src={logo} />
    </div>
  );
}

export default App;
