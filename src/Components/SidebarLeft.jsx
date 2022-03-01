import useSound from "use-sound";
import { useContext, useEffect, useRef, useState } from "react";
import { channelContext } from "../context/channelContext";
import { userContext } from "../context/userContext";
import "../styles/SidebarLeft.css";

import boopSfx from "../sounds/chanjoin.mp3";
import NewChannel from "./NewChannel";
import { mediaStreamContext } from "../context/mediaStreamContext";

// interface Channel {
//   isChat: boolean;
//   name: string;
//   _id: string;
//   currentUsers: [string];
// }

function SidebarLeft() {
  function downHandler({ key }) {
    if (key === "Shift") {
    }
  }

  function upHandler({ key }) {
    if (key === "Shift") {
    }
  }

  const {
    channel,
    loadChannels,
    loadChannel,
    addUserToChannel,
    removeUserFromChannel,
    currentChannel,
  } = useContext(channelContext);

  const { toggleMic, enableMic, disableMic } = useContext(mediaStreamContext);

  const { user } = useContext(userContext);

  const [play] = useSound(boopSfx);

  useEffect(() => {
    loadChannels();
    console.log("Called");
  }, []);

  const renderChannelIcon = (channel) => {
    let classes = "channel-icon fas ";
    classes += channel.isChat ? "fa-regular fa-comment-dots" : "fa-headset";
    return classes;
  };

  const handleChannelClick = async (channel) => {
    if (currentChannel === channel._id) return;

    if (currentChannel) {
      removeUserFromChannel(user, currentChannel);
    }
    await addUserToChannel(user, channel);
    play();
    loadChannels();
  };

  const handleChannelRightClick = (channel) => {};

  const handleUserClickMember = (channelMember) => {};

  const handleUserRightClick = (channelMember) => {};

  const renderMic = () => {
    let style = "user-microphone fa-solid fa-microphone";
    if (user.micMuted) style += "-slash";
    return style;
  };

  const handleClickMic = () => {
    toggleMic();
    loadChannels();
  };

  return (
    <div className="sidebar-container">
      <div className="create-new-channel">
        <NewChannel />
      </div>
      <ul>
        {channel.map((chan) => (
          <li key={channel._id} className="li-style">
            <i className={renderChannelIcon(chan)}></i>
            <div
              onClick={() => handleChannelClick(chan)}
              onContextMenu={() => handleChannelRightClick(chan)}
              className="channel-list"
            >
              {chan.name}
            </div>
            <i className="gear-icon fa-solid fa-gear"></i>
            {chan.currentUsers &&
              chan.currentUsers.map((channelMember) => (
                <div>
                  <h5
                    onClick={() => handleUserClickMember(channelMember)}
                    onContextMenu={() => handleUserRightClick(channelMember)}
                    className="channel-user"
                  >
                    {channelMember.userLogo && (
                      <img
                        className="channel-user-image"
                        src={channelMember.userLogo}
                        alt="userLogo"
                      />
                    )}
                    {channelMember.name}
                  </h5>
                  {channelMember.micMuted && (
                    <span className="fa-solid fa-microphone-slash"></span>
                  )}
                </div>
              ))}
          </li>
        ))}
      </ul>
      {user && (
        <div className="user-container">
          {currentChannel && (
            <>
              <i className="connection-signal fa-solid fa-signal"></i>
              <i className="voice-connected">Voice Connected</i>
              <i
                onClick={() => removeUserFromChannel(user, currentChannel)}
                className="disconnect-logo fa-solid fa-phone-slash"
              ></i>
            </>
          )}
          <img
            key={user._id}
            className="user-bottom-logo channel-user-image"
            src={user.userLogo}
            alt="userLogo"
          />
          <i className="user-bottom-name">{user.name}</i>
          <i onClick={() => handleClickMic()} className={renderMic()}></i>
          <i className="user-headset fa-solid fa-headphones"></i>
          <i className="user-settings fa-solid fa-gear"></i>
        </div>
      )}
    </div>
  );
}

export default SidebarLeft;
