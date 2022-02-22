import React, { useContext, useEffect } from "react";
import { clientSocketContext } from "../context/clientSocketContext";
import "../styles/Footer.css";

//TODO SOCKET NEEDS TO BE DONE HERE
function Footer() {
  const { socket } = useContext(clientSocketContext);

  useEffect(() => {}, [socket]);

  return (
    <div className="footer-container">
      <h3 className="conn-info">Connection Info: </h3>
      <h4 className="socket">
        {socket && socket.connected ? "online" : "offline"}
      </h4>
      <h4 className="peer">RTCConnection: OFFLINE</h4>
    </div>
  );
}

export default Footer;
