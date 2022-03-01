import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { mediaStreamContext } from "../context/mediaStreamContext";

const Container = styled.div``;

const StyledVideo = styled.video``;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props?.peer?.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const Room = () => {
  const { userVideo, peers } = useContext(mediaStreamContext);

  return (
    <Container>
      <h1>VOICE</h1>
      <StyledVideo muted ref={userVideo} playsInline />
      {peers.map((peer, index) => {
        return <Video key={index} peer={peer} />;
      })}
    </Container>
  );
};

export default Room;
