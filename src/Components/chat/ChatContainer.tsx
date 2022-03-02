import styled from "styled-components";
import MessageList from "./MessageList";
import SendMessage from "./SendMessage";

function SendChatMessage() {
  return (
    <Container>
      {/* Message Header */}
      <ChatHeader>Chat Header</ChatHeader>

      {/* Messages List */}
      <MessageList />

      {/* Send Message Box */}
      <SendMessage />
    </Container>
  );
}

const ChatHeader = styled.div`
  grid-row: 1;
`;

const Container = styled.div`
  border: solid black 2px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 7% auto 10%;
  justify-content: center;
`;

export default SendChatMessage;
