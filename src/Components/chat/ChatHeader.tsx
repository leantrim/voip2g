import { useContext, useEffect } from "react";
import { userContext } from "context/userContext";
import styled from "styled-components";
import { channelContext } from "context/channelContext";
import { mediaStreamContext } from "context/mediaStreamContext";

function ChatHeader() {
  const {
    currentChat,
    user,
    currentChannel,
    channelLogging,
    setChannelLogging,
  } = useContext(userContext);
  const { channel, handleChannelClick, handleClickDisconnect } =
    useContext(channelContext);
  const { toggleMic } = useContext(mediaStreamContext);

  const handleClickMic = () => {
    toggleMic();
  };

  const renderMic = () => {
    let style = "user-microphone fa-solid fa-microphone";
    if (user.micMuted) style += "-slash";
    return style;
  };

  useEffect(() => {
    console.log(currentChat);
  }, [currentChat]);

  const renderToggleButton = () => {
    let style = "toggle-button fa-solid fa-toggle-";
    style += channelLogging ? "on" : "off";
    return style;
  };

  const toggleLogButton = () => {
    const toggleStatus = !channelLogging;
    console.log(toggleStatus);
    setChannelLogging(toggleStatus);
  };

  return (
    <Container>
      <h3 className="chat-header">{currentChat.name}</h3>
      <div className="info-text">
        {(channelLogging && "Disable Log") || "Enable Log"}
      </div>
      <i onClick={() => toggleLogButton()} className={renderToggleButton()}></i>
      {(currentChannel._id && (
        <>
          <i className="connection-signal fa-solid fa-signal"></i>
          <i className="screen-share fa-solid fa-desktop"></i>
          <i
            onClick={() => handleClickDisconnect(user)}
            className="disconnect-logo fa-solid fa-phone-slash"
          ></i>

          <i onClick={() => handleClickMic()} className={renderMic()}></i>
          <i className="user-headset fa-solid fa-headphones"></i>
        </>
      )) || <i className="chat-icon fa-solid fa-message"></i>}
    </Container>
  );
}

const Container = styled.div`
    display: inline-grid;
    background-color: #2b2d3a;
    grid-template-columns: 5% 1fr 20% repeat(4,6%) 1fr;
    grid-template-rows: 100% 10%;
    width: 100%;
    height: 6vh;
    text-align: center;
    align-items: center;
    border-radius: 3px;

    & .chat-icon {
      grid-row: 1;
      font-size: 24px;
    color: #2e86ab;
    }

    & .info-text {
      padding-bottom: 2em;
    grid-column: end;
    }

    & .toggle-button {
      grid-column: end;
    margin-right: 3em;
    margin-left: 3em;
    font-size: 22px;
    color: #2e86ab;
    padding-bottom: 2.3em;
    }

    & .toggle-button:hover {
      color: #8f0000;
      cursor: pointer;
    }

    & .chat-header {
      grid-column: 2;
    grid-row: 1;
    margin-top: 15px;
    color: white;
    text-align: start;
    }
    
  & .voice-connected {
    grid-column: 2;
    font-weight: 500;
    font-size: 16px;
    margin-top: 12px;
    color: #2fdd64;
}
  }


  & .connection-signal {
    grid-column: 1;
    grid-row: 1;
    color: green;
    font-size: 24px;
    padding-right: 5px;
    padding-bottom: 5px;
  }

  & .screen-share {
    grid-column: 4;
    font-size: 20px;
    color: #2e86ab;
  }

  & .screen-share:hover{
    color: green;
    cursor: pointer;
  }

  & .disconnect-logo {
    grid-column: 7;
    font-size: 20px;
    color: #2e86ab;
  }

  & .user-headset {
    grid-column: 5;
    grid-row: 1;
    font-size: 22px;
    color: #2e86ab;
  }

  & .user-microphone {
    grid-column: 6;
    font-size: 22px;
    color: #2e86ab;
  }

  & .disconnect-logo,
  .user-microphone,
  .screen-share,
  .user-headset {
    grid-row: 1;
  }


  & .disconnect-logo:hover,
  .user-microphone:hover,
  .user-headset:hover {
    color: #b12640;
    cursor: pointer;
    grid-row: 1;
  }
`;

export default ChatHeader;
