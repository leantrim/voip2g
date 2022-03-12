import { useContext } from "react";

import { userContext } from "../../context/userContext";
import { mediaStreamContext } from "../../context/mediaStreamContext";

function ListChannel({ chan, handleChannelClick, handleClickDisconnect }) {
  const { toggleMic } = useContext(mediaStreamContext);

  const { user } = useContext(userContext);

  const renderChannelIcon = (channel) => {
    let classes = "channel-icon fas ";
    classes += channel.isChat ? "fa-regular fa-comment-dots" : "fa-headset";
    return classes;
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
  };

  let userBeingDragged = {};
  let channelDraggedTo;

  const handleUserMoveOfficial = () => {
    console.log(
      "user was moved to channel",
      userBeingDragged.name,
      channelDraggedTo.name
    );
  };

  return (
    <li key={chan._id} className="li-style">
      <i className={renderChannelIcon(chan)}></i>
      <div
        onClick={() => handleChannelClick(user, chan)}
        onContextMenu={() => handleChannelRightClick(chan)}
        className="channel-list"
        onDragEnter={() => (channelDraggedTo = chan)}
      >
        {chan.name}
      </div>
      <i className="gear-icon fa-solid fa-gear"></i>
      {chan.currentUsers &&
        chan.currentUsers.map((channelMember) => (
          <div key={channelMember._id}>
            <h5
              onClick={() => handleUserClickMember(channelMember)}
              onContextMenu={() => handleUserRightClick(channelMember)}
              className="channel-user"
              draggable={true}
              onDrag={() => (userBeingDragged = channelMember)}
              onDragEnd={() => handleUserMoveOfficial()}
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
  );
}

// {user && (
//   <div className="user-container">
//     {currentChannel && (
//       <>
//         <i className="connection-signal fa-solid fa-signal"></i>
//         <i className="voice-connected">Voice Connected</i>
//         <i
//           onClick={() => handleClickDisconnect()}
//           className="disconnect-logo fa-solid fa-phone-slash"
//         ></i>
//       </>
//     )}
//     <img
//       key={user._id}
//       className="user-bottom-logo channel-user-image"
//       src={user.userLogo}
//       alt="userLogo"
//     />
//     <i className="user-bottom-name">{user.name}</i>
//     <i onClick={() => handleClickMic()} className={renderMic()}></i>
//     <i className="user-headset fa-solid fa-headphones"></i>
//     <i className="user-settings fa-solid fa-gear"></i>
//   </div>

export default ListChannel;
