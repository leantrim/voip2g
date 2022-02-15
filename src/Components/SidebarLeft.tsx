import auth from "../services/authService";
import "../styles/SidebarLeft.css";
import { userLogoExample } from "../config.json";

function SidebarLeft() {
  //TODO: userContext should be used for current user!
  // const [user, setUser] = useState({});

  const user: any = auth.getCurrentUser();

  const channels = [
    {
      name: "Hemma",
      isChat: false,
      members: [],
    },
    {
      name: "Gaming",
      isChat: false,
      members: [],
    },
    {
      name: "RedBull Racing",
      isChat: false,
      members: [
        {
          user: "LEO =D",
          userLogo: userLogoExample,
          isMuted: false,
        },
        {
          user: "recoba789",
          userLogo: userLogoExample,
          isMuted: false,
        },
        {
          user: "hnsstatic",
          userLogo: userLogoExample,
          isMuted: false,
        },
        {
          user: "MjolkaD",
          userLogo: userLogoExample,
          isMuted: true,
        },
        {
          user: "oskaaarn",
          userLogo: userLogoExample,
          isMuted: false,
        },
      ],
    },
    {
      name: "All Chat",
      isChat: true,
      members: [],
    },
    {
      name: "AFK",
      isChat: false,
      members: [
        {
          user: "b-bad",
          userLogo: userLogoExample,
          isMuted: true,
        },
        {
          user: "majoo",
          userLogo: userLogoExample,
          isMuted: true,
        },
        {
          user: "beep",
          userLogo: userLogoExample,
          isMuted: true,
        },
      ],
    },
  ];

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

  return (
    <div className="container">
      <ul>
        Channels
        {channels.map((channel) => (
          <li key={channel.name}>
            <i className={renderChannelIcon(channel)}></i>
            <div
              onClick={() => handleChannelClick(channel)}
              onContextMenu={() => handleChannelRightClick(channel)}
              className="channel-list"
            >
              {channel.name}
            </div>
            {channel.members.map((channelMember) => (
              <h5
                key={channelMember.user}
                onClick={() => handleUserClickMember(channelMember)}
                onContextMenu={() => handleUserRightClick(channelMember)}
                className="channel-user"
              >
                <img
                  className="channel-user-image"
                  src={channelMember.userLogo}
                  alt="userLogo"
                />
                {channelMember.user}
                {channelMember.isMuted && (
                  <i className="user-muted-icon fas fa-microphone-alt-slash"></i>
                )}
              </h5>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarLeft;
