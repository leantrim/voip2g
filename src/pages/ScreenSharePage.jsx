import { screenContext } from "context/screenShareContext";
import React, { useContext, useEffect, useRef } from "react";

function ScreenSharePage() {
  const { userVideo } = useContext(screenContext);
  const ref = useRef({});

  console.log(userVideo);

  const jsonValue = localStorage.getItem("watchingStream");
  console.log(ref.current.srcObject);
  ref.current.srcObject = JSON.stringify(jsonValue);

  console.log(userVideo);
  return (
    <div>
      <video autoPlay muted ref={ref}></video>
    </div>
  );
}

export default ScreenSharePage;
