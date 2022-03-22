import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { userContext } from "../../context/userContext";
import ListChannelUser from "./ListChannelUser";

import Channel from "types/Channel";
import User from "types/Channel";

function ListChannel({ chan, handleChannelClick }: any) {
  const { user } = useContext(userContext);
  const [channelDraggedTo, setChannelDraggedTo] = useState();
  const [userBeingDragged, setUserBeingDragged] = useState();

  const renderChannelIcon = (channel: any) => {
    let classes = "channel-icon fas ";
    classes += channel.isChat ? "fa-regular fa-comment-dots" : "fa-headset";
    return classes;
  };

  const handleChannelRightClick = (channel: Channel) => {};

  let userBeing = "";

  const handleUserMoveOfficial = (channel: Channel) => {
    console.log(userBeing);
    console.log(channel);
  };

  function allowDrop(ev: any) {
    ev.preventDefault();
  }

  return (
    <ChannelList>
      <li key={chan._id} className="li-style">
        <i className={renderChannelIcon(chan)}></i>
        <div
          onClick={() => handleChannelClick(user, chan)}
          onContextMenu={() => handleChannelRightClick(chan)}
          className="channel-list"
          onDrop={() => handleUserMoveOfficial(chan)}
          onDragOver={(ev) => allowDrop(ev)}
          onDragEnd={(ev) => allowDrop(ev)}
        >
          {chan.name}
        </div>
        <i className="gear-icon fa-solid fa-gear"></i>
        {chan.currentUsers &&
          chan.currentUsers.map((channelMember: User) => (
            <ListChannelUser
              key={channelMember._id}
              channelMember={channelMember}
              setUserBeingDragged={setUserBeingDragged}
            />
          ))}
      </li>
    </ChannelList>
  );
}

const ChannelList = styled.div`
  grid-row: 2;
  & .li-style {
    background-color: #2b2d3a;
    margin-bottom: 25px;
    border-radius: 18px;
  }

  & li {
    list-style-type: none;
    grid-column: 1;
  }
  & .channel-list {
    color: #ffffff;
    display: inline;
    font-size: 22px;
    cursor: pointer;
    font-weight: 500;
  }

  & .channel-list:hover {
    color: grey;
    display: inline;
    font-size: 24px;
    cursor: pointer;
    font-weight: 500;
  }

  & .channel-icon {
    font-size: 24px;
    color: #2e86ab;
    margin: 10px;
  }
  & .sidebar-container .gear {
    grid-column: 2;
    cursor: pointer;
  }

  & .gear-icon {
    cursor: pointer;
    float: right;
    margin-right: 10px;
    margin-top: 18px;
  }

  & .fa-comment-alt {
    font-size: 18px;
  }
`;

export default ListChannel;
