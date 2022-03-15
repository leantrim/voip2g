import styled from "styled-components";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import SendMessage from "./SendMessage";

function SendChatMessage() {
  return (
    <Container>
      {/* Message Header */}
      <ChatHeader />

      {/* Messages List */}
      <MessageList />

      {/* Send Message Box */}
      <SendMessage />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-row: 1;
  grid-column: 2;
  grid-template-rows: 7% auto 7%;
  grid-template-columns: 100%;
  background-color: #1b1e27;
  overflow: hidden;
  width: 100%;
  height: 99%;
  justify-content: center;
  border: 4px solid #2b2d3a;
  border-radius: 8px;
`;

/* CSS Nice To have in future :)
overflow: scroll;
height: 100vh;

::-webkit-scrollbar {
    display:none;
}
*/

export default SendChatMessage;
