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
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 7% auto 7%;
  grid-template-columns: 100%;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
`;

/* CSS Nice To have in future :)
overflow: scroll;
height: 100vh;

::-webkit-scrollbar {
    display:none;
}
*/

export default SendChatMessage;
