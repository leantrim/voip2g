import { useContext, useEffect, useRef } from "react";
import { mediaStreamContext } from "../../context/mediaStreamContext";

// Play Sound for user without actually clicking on anything! =DD
// const PlaySound = () => {
//   const HtmlSoundRef = useRef(null);
//   const setSound = () => {
//     HtmlSoundRef.current && HtmlSoundRef.current.click();
//   };

//   return [HtmlSoundRef, setSound];
// };
// const [soundRef, setSound] = PlaySound();
// setSound();
// <button ref={soundRef} onClick={() => handlePlayMusic()}></button>
//   const handlePlayMusic = () => {
//     play();
//   };

const Audio = (props) => {
  const ref = useRef("");

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
