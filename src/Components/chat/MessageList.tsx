import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { useContext } from "react";
import { channelContext } from "../../context/channelContext";
import DisplayMessage from "./DisplayMessage";
import { chatContext } from "../../context/chatContext";

function MessageList() {
  const { getCurrentChat, chatList } = useContext(chatContext);

  const { currentChannel } = useContext(channelContext);

  console.log(chatList);
  useEffect(() => {
    getCurrentChat();
  }, []);

  return (
    <Container>
      <div className="message-container">
        {chatList?.data?.message?.map((chat: any) => (
          <DisplayMessage key={uuidv4()} message={chat} />
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  overflow: auto;

  & .message-container {
  }
`;

export default MessageList;
