import React from "react";
import NewChannel from "./channel/NewChannel";

function SidebarLeft(props) {
  return (
    <ul className="nav flex-column fixed-top pt-5 p-3">
      <li className="nav-item">
        <h3 className="nav-link ">
          <NewChannel />
        </h3>
      </li>
      <li className="nav-item">
        <h5
          style={{ cursor: "pointer" }}
          className="fas fa-headset mt-3 text-info"
          variant="primary"
        >
          {" "}
          Hemma
        </h5>
      </li>
      <li className="nav-item">
        <h5
          style={{ cursor: "pointer" }}
          className="fas fa-headset mt-3 text-info"
          variant="primary"
        >
          {" "}
          Hemma
        </h5>
      </li>
      <li className="nav-item">
        <h5
          style={{ cursor: "pointer" }}
          className="fas fa-headset mt-3 text-info"
          variant="primary"
        >
          {" "}
          Hemma
        </h5>
      </li>
    </ul>
  );
}

export default SidebarLeft;
