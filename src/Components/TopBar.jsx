import React from "react";
import Logout from "./usersystem/Logout";

function TopBar() {
  return (
    <nav className="navbar navbar-default p-10">
      <div className="justify-content-center">
        <i style={{color: 'white'}}>TOP LEFT NAVBAR</i>
      </div>
      <div className="flex-column-reverse">
        <i style={{color: 'white'}}>TOP RIGHT NAVBAR</i>
        <Logout />
      </div>
    </nav>
  );
}

export default TopBar;
