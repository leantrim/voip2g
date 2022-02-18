import { useContext, useEffect } from "react";
import io from "socket.io-client";
import { userContext } from "../context/userContext";
import SidebarLeft from "./SidebarLeft";
import "../styles/Main.css";

//TODO usercontext, refactor socket(REWORK?) connection code to services file

function Main() {
  const { user, logOutUser, getCustomUser } = useContext(userContext);

  return (
    <div className="main-container">
      <div className="header-container">
        <button onClick={() => logOutUser()}></button>
      </div>
      <div className="sidebar-left">
        <SidebarLeft />
      </div>
    </div>
  );
}

export default Main;
