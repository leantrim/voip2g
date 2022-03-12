import "styles/SidebarLeft.css";

import NewChannel from "./voiceSystem/NewChannel";
import ChannelList from "./voiceSystem/ChannelList";

function SidebarLeft() {
  return (
    <div className="sidebar-container">
      <div className="create-new-channel">
        <NewChannel />
      </div>
      <ChannelList />
    </div>
  );
}

export default SidebarLeft;
