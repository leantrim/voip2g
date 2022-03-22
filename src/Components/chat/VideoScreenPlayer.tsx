import { screenContext } from "context/screenShareContext";
import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";

function VideoScreenPlayer() {
  const { setUserVideo, userVideo } = useContext(screenContext);
  const ref = useRef({ srcObject: {} });

  useEffect(() => {
    const getUserMedia = () => {
      try {
        ref.current.srcObject = userVideo;
      } catch (err) {
        console.log(err);
      }
    };
    getUserMedia();
  }, [userVideo]);

  console.log(ref);

  const toggleFullScreen = () => {
    var el: any = document.getElementById("full-screenVideo");
    if (el.requestFullscreen) {
      el.requestFullscreen();
    }
  };

  return (
    <VideoContainer>
      <Video autoPlay id="full-screenVideo" muted ref={ref}></Video>
      <div className="controlsContainer"></div>
    </VideoContainer>
  );
}

const VideoContainer = styled.div`
  video::-webkit-media-controls-timeline,
  video::-webkit-media-controls-play-button {
    display: none;
  }

  & .fullscreen {
    color: white;
    font-size: 18px;
  }
  grid-row: 1;
`;

const Video = styled.video`
  width: 100%;
  border: 0;
  object-fit: cover;
`;

export default VideoScreenPlayer;
