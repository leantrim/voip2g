import useSound from "use-sound";
import { useContext, useEffect } from "react";
import { channelContext } from "../context/channelContext";
import { userContext } from "../context/userContext";
import "../styles/SidebarLeft.css";

import boopSfx from "../sounds/chanjoin.mp3";
import { clientSocketContext } from "../context/clientSocketContext";
import NewChannel from "./NewChannel";

interface Channel {
  isChat: boolean;
  name: string;
  _id: string;
  currentUsers: [string];
}

function SidebarLeft() {
  const {
    channel,
    loadChannels,
    addUserToChannel,
    removeUserFromChannel,
    currentChannel,
  } = useContext(channelContext);

  const { userJoinChanSocketMsg } = useContext(clientSocketContext);

  const { user, setUser } = useContext(userContext);

  const [play] = useSound(boopSfx);

  const renderChannelIcon = (channel: Channel) => {
    let classes = "channel-icon fas ";
    classes += channel.isChat ? "fa-regular fa-comment-dots" : "fa-headset";
    return classes;
  };

  window.onbeforeunload = function () {
    //If user left the page
    removeUserFromChannel(user, currentChannel);
    userJoinChanSocketMsg();
  };

  const handleChannelClick = async (channel: Channel) => {
    if (currentChannel === channel._id) return;

    if (currentChannel) {
      removeUserFromChannel(user, currentChannel);
    }
    await addUserToChannel(user, channel);
    userJoinChanSocketMsg(channel);
    play();
    loadChannels();
  };

  const handleChannelRightClick = (channel: Channel) => {};

  const handleUserClickMember = (channelMember: Channel) => {};

  const handleUserRightClick = (channelMember: Channel) => {};

  useEffect(() => {
    loadChannels();
  }, [currentChannel, user]);

  return (
    <div className="sidebar-container">
      <div className="create-new-channel">
        <NewChannel />
      </div>
      <ul>
        {channel.map((chan: Channel) => (
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
              chan.currentUsers.map((channelMember: any) => (
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
          <i className="user-microphone fa-solid fa-microphone"></i>
          <i className="user-headset fa-solid fa-headphones"></i>
          <i className="user-settings fa-solid fa-gear"></i>
        </div>
      )}
    </div>
  );
}

export default SidebarLeft;
