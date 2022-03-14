import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { userContext } from "../../context/userContext";
import ListChannelUser from "./ListChannelUser";

function ListChannel({ chan, handleChannelClick }) {
  const { user } = useContext(userContext);
  const [channelDraggedTo, setChannelDraggedTo] = useState();
  const [userBeingDragged, setUserBeingDragged] = useState();

  const renderChannelIcon = (channel) => {
    let classes = "channel-icon fas ";
    classes += channel.isChat ? "fa-regular fa-comment-dots" : "fa-headset";
    return classes;
  };

  const handleChannelRightClick = (channel) => {};

  let userBeing = "";

  const handleUserMoveOfficial = (channel) => {
    console.log(userBeing);
    console.log(channel);
  };

  function allowDrop(ev) {
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
          chan.currentUsers.map((channelMember) => (
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