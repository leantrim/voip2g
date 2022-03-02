import { useContext, useEffect, useRef } from "react";
import { mediaStreamContext } from "../context/mediaStreamContext";

const Audio = (props) => {
  const ref = useRef();

  useEffect(() => {
    if (props?.peer?.on) {
      props?.peer?.on("stream", (stream) => {
        ref.current.srcObject = stream;
      });
    }
  });

  return <audio autoPlay ref={ref} />;
};

const Room = () => {
  const { peers } = useContext(mediaStreamContext);

  return (
    <>
      {peers.map((peer, index) => {
        return <Audio key={index} peer={peer} />;
      })}
    </>
  );
};

export default Room;
