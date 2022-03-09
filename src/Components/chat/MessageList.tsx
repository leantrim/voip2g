import { useEffect, useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { channelContext } from "../../context/channelContext";
import chatService from "../../services/chatService";
import DisplayMessage from "./DisplayMessage";
import { chatContext } from "../../context/chatContext";

function MessageList() {
  const { getCurrentChat, chatList } = useContext(chatContext);

  const { currentChannel } = useContext(channelContext);

  useEffect(() => {}, [chatList]);

  return (
    <Container>
      <div className="message-container">
        {chatList?.data?.message?.map((chat: any) => (
          <DisplayMessage message={chat} />
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
