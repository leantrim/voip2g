import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { useContext } from "react";
import DisplayMessage from "./DisplayMessage";
import { chatContext } from "../../context/chatContext";

function MessageList() {
  const { chatList } = useContext(chatContext);

  useEffect(() => {}, [chatList]);

  return (
    <Container>
      <div className="message-container">
        {chatList.message.map((chat: any) => (
          <DisplayMessage key={uuidv4()} message={chat} />
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  overflow: auto;
  margin-top: 14px;
  margin-right: 10px;
  margin-bottom: 10px;

  & .message-container {
  }
`;

export default MessageList;
