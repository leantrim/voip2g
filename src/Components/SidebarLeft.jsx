import React from "react";
import NewChannel from "./channel/NewChannel";
import ListChannels from "./channel/ListChannels";

function SidebarLeft(props) {
  return (
    <ul className="nav flex-column fixed-top pt-5 p-3">
      <li className="nav-item">
        <i className="nav-link ">
          <NewChannel />
        </i>
      </li>
      <li className="nav-item">
        <ListChannels />
      </li>
      <li className="nav-item">
        <i
          style={{ cursor: "pointer" }}
          className="fas fa-comment-alt mt-3 text-info"
          variant="primary"
        >
          {" "}
          ALL CHAT
        </i>
      </li>
    </ul>
  );
}

export default SidebarLeft;
