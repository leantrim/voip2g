import { useContext, useEffect } from "react";
import { clientSocketContext } from "../context/clientSocketContext";
import "../styles/Footer.css";

function Footer() {
  const { lobby } = useContext(clientSocketContext);

  useEffect(() => {}, [lobby]);

  return (
    <div className="footer-container">
      <h3 className="conn-info">Connection Info: </h3>
      <h4 className="socket">{lobby?.connected ? "online" : "offline"}</h4>
      <h4 className="peer">RTCConnection: OFFLINE</h4>
    </div>
  );
}

export default Footer;
