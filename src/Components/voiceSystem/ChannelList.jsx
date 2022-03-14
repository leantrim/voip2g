import { useContext, useEffect } from "react";

import { channelContext } from "../../context/channelContext";
import ListChannel from "./ListChannel";

function ChannelList() {
  const { channel, handleChannelClick, handleClickDisconnect, loadChannels } =
    useContext(channelContext);

  useEffect(() => {
    loadChannels();
    console.log("RAN");
  }, []);

  return (
    <div>
      {channel.map((chan) => (
        <ListChannel
          key={chan._id}
          chan={chan}
          handleChannelClick={handleChannelClick}
          handleClickDisconnect={handleClickDisconnect}
        />
      ))}
    </div>
  );
}

export default ChannelList;
