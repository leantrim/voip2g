import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <h3 className="conn-info">Connection Info: </h3>
      <h4 className="socket">ClientSocket: LIVE</h4>
      <h4 className="peer">RTCConnection: OFFLINE</h4>
    </div>
  );
}

export default Footer;
