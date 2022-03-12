import { useContext } from "react";

import { channelContext } from "../../context/channelContext";
import ListChannel from "./ListChannel";

function ChannelList() {
  const { channel, handleChannelClick, handleClickDisconnect } =
    useContext(channelContext);

  return (
    <div>
      {channel.map((chan) => (
        <ListChannel
          chan={chan}
          handleChannelClick={handleChannelClick}
          handleClickDisconnect={handleClickDisconnect}
        />
      ))}
    </div>
  );
}

export default ChannelList;
