import styled from "styled-components";

function ListChannelUser({
  channelMember,
  handleUserMoveOfficial,
  setUserBeingDragged,
}: any) {
  const handleUserClickMember = (channelMember: string) => {};

  const handleUserRightClick = (channelMember: string) => {};

  return (
    <ListUser key={channelMember._id}>
      <h5
        onClick={() => handleUserClickMember(channelMember)}
        onContextMenu={() => handleUserRightClick(channelMember)}
        className="channel-user"
        draggable={true}
        onDrag={() => setUserBeingDragged(channelMember)}
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
    </ListUser>
  );
}

const ListUser = styled.div`
  & .channel-user {
    font-size: 21px;
    cursor: pointer;
    margin-bottom: 0px;
    margin-top: 0px;
    background-color: #2b2d3a;
    color: #2e86ab;
    padding-left: 20px;
  }

  & .channel-user-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding-right: 5px;
    vertical-align: middle;
    margin-bottom: 10px;
  }

  & .user-muted-icon {
    margin-left: 5px;
    font-size: 15px;
    color: #8f742f;
  }

  & .inChannel {
    grid-row: 1;
  }

  & .user-container {
    display: grid;
    grid-template-rows: 50%;
    grid-template-columns: 7px 2.5em auto;
    background-color: #152355;
  }
`;

export default ListChannelUser;
