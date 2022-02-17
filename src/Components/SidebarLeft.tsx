import { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { channelContext } from "../context/channelContext";
import { userContext } from "../context/userContext";
import { userLogoExample } from "../config.json";
import "../styles/SidebarLeft.css";
import Channels from "./Channels";

function SidebarLeft() {
  const { channel, loadChannels } = useContext(channelContext);
  const { user } = useContext(userContext);

  useEffect(() => {
    loadChannels();
  }, []);

  const renderChannelIcon = (channel: any) => {
    let classes = "channel-icon fas ";
    classes += channel.isChat ? "fa-regular fa-comment-dots" : "fa-headset";
    return classes;
  };

  const handleChannelClick = (channel: any) => {
    console.log(`${user.name} clicked `, channel);
  };

  const handleChannelRightClick = (channel: any) => {
    console.log(`${user.name} right clicked `, channel);
  };

  const handleUserClickMember = (channelMember: any) => {
    console.log(`${user.name} clicked on user `, channelMember);
  };

  const handleUserRightClick = (channelMember: any) => {
    console.log(`${user.name} right clicked on client `, channelMember);
  };

  //return channel.map((chan: any) => <Channels channel={chan} />);
  return (
    <div className="container">
      <ul>
        Channels
        {channel.map((chan: any) => (
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
