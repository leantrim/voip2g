import React from "react";
import "../styles/Header.css";
import { logo } from "../config.json";

function Header() {
  return (
    <div className="head-container">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="user">
        <h3>Lean</h3>
      </div>
    </div>
  );
}

export default Header;
