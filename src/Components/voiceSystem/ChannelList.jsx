import { useContext, useEffect } from "react";

import { ChannelContext } from "../../context/ChannelContext";
import ListChannel from "./ListChannel";

function ChannelList() {
  const { channel, handleChannelClick, handleClickDisconnect, loadChannels } =
    useContext(ChannelContext);

  useEffect(() => {
    loadChannels();
  }, []);

  return (
    <div>
      {channel.map((channel) => (
        <ListChannel
          key={channel._id}
          chan={channel}
          handleChannelClick={handleChannelClick}
          handleClickDisconnect={handleClickDisconnect}
        />
      ))}
    </div>
  );
}

export default ChannelList;
