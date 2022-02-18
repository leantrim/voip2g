import { useContext, useEffect } from "react";
import { channelContext } from "../context/channelContext";
import { userContext } from "../context/userContext";
import "../styles/SidebarLeft.css";
import useSound from "use-sound";

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

  const { user: user } = useContext(userContext);

  const [play] = useSound(boopSfx);

  const renderChannelIcon = (channel: Channel) => {
    let classes = "channel-icon fas ";
    classes += channel.isChat ? "fa-regular fa-comment-dots" : "fa-headset";
    return classes;
  };

  window.onbeforeunload = function () {
    //If user left the page
    removeUserFromChannel(user, currentChannel);
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

  return (
    <div className="container">
      <ul>
        Channels
        <button onClick={() => removeUserFromChannel(user, currentChannel)}>
          DISCONNECT TEST!
        </button>
        {channel.map((chan: Channel) => (
          <li key={chan.name}>
            <i className={renderChannelIcon(chan)}></i>
            <div
              onClick={() => handleChannelClick(chan)}
              onContextMenu={() => handleChannelRightClick(chan)}
              className="channel-list"
            >
              {chan.name}
            </div>
            {chan.currentUsers.map((channelMember: any) => (
              <h5
                key={channelMember.user}
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
    </div>
  );
}

export default SidebarLeft;
