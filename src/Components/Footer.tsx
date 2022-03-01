import { useContext, useEffect } from "react";
import { channelSocketContext } from "../context/channelSocketContext";
import { mediaStreamContext } from "../context/mediaStreamContext";
import "../styles/Footer.css";

function Footer() {
  const { channel } = useContext(channelSocketContext);
  const { peersRef } = useContext(mediaStreamContext);

  console.log(peersRef.current[0]);

  return (
    <div className="footer-container">
      <h3 className="conn-info">Connection Info: </h3>
      <h4 className="socket">{channel?.connected ? "online" : "offline"}</h4>
      <h4 className="peer">
        RTCConnection: {peersRef.current[0] ? "online" : "offline"}
      </h4>
    </div>
  );
}

export default Footer;
