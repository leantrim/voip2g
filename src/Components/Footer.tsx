import { useContext } from "react";
import { channelSocketContext } from "../context/channelSocketContext";
import { mediaStreamContext } from "../context/mediaStreamContext";
import styled from "styled-components";

function Footer() {
  const { channel } = useContext(channelSocketContext);
  const { peersRef } = useContext(mediaStreamContext);

  return (
    <Container>
      <h3 className="conn-info">Connection Info: </h3>
      <h4 className="socket">{channel?.connected ? "online" : "offline"}</h4>
      <h4 className="peer">
        RTCConnection: {peersRef.current[0] ? "online" : "offline"}
      </h4>
    </Container>
  );
}

const Container = styled.div`
  grid-row: 3;
  background-color: #1b1e27;
  display: grid;
  grid-template-columns: 15px repeat(8, 10em);
  grid-template-rows: 100%;
  grid-gap: 8px;

  & .conn-info {
    grid-column: 2;
  }

  & .socket {
    color: green;
    grid-column: 3;
  }

  & .peer {
    color: red;
    grid-column: 4;
  }
`;

export default Footer;
