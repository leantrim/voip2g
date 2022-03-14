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
  width: 95%;
  height: 99%;
  display: grid;
  grid-template-rows: 7% auto 7%;
  grid-template-columns: 100%;
  justify-content: center;
  border: 6px solid #2b2d3a;
  border-radius: 8px;
  margin-left: 29px;
  margin-right: 9px;
  background-color: #252832;
`;

/* CSS Nice To have in future :)
overflow: scroll;
height: 100vh;

::-webkit-scrollbar {
    display:none;
}
*/

export default SendChatMessage;
