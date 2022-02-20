import useSound from "use-sound";
import { useContext } from "react";
import { channelContext } from "../context/channelContext";
import { userContext } from "../context/userContext";
import "../styles/SidebarLeft.css";

import boopSfx from "../sounds/chanjoin.mp3";
import { clientSocketContext } from "../context/clientSocketContext";

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
    userJoinChanSocketMsg();
    play();
    loadChannels();
  };

  const handleChannelRightClick = (channel: Channel) => {};

  const handleUserClickMember = (channelMember: Channel) => {};

  const handleUserRightClick = (channelMember: Channel) => {};

  console.log(user);

  //   <button onClick={() => removeUserFromChannel(user, currentChannel)}>
  //   DISCONNECT
  // </button>

  return (
    <div className="sidebar-container">
      <span className="create-new-channel">
        <i className="plus-sign fa-solid fa-plus"></i>
        <i className="new-channel-text">Create a new channel</i>
      </span>
      <ul>
        {channel.map((chan: Channel) => (
          <li className="li-style" key={channel._id}>
            <i className={renderChannelIcon(chan)}></i>
            <div
              onClick={() => handleChannelClick(chan)}
              onContextMenu={() => handleChannelRightClick(chan)}
              className="channel-list"
            >
              {chan.name}
            </div>
            <i className="gear-icon fa-solid fa-gear"></i>
            {chan.currentUsers.map((channelMember: any) => (
              <h5
                onClick={() => handleUserClickMember(channelMember)}
                onContextMenu={() => handleUserRightClick(channelMember)}
                className="channel-user"
                key={channelMember._id}
              >
                {channelMember.userLogo && (
                  <img
                    key={channelMember._id}
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
