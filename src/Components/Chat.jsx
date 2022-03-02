import { useState } from "react";
import styled from "styled-components";

function Chat() {
  const [message, setMessage] = useState("");

  const handleKeyDown = (event) => event.key === "Enter" && handleSubmit();

  const handleSubmit = () => {
    console.log(message);
    setMessage("");
  };

  return (
    <Container>
      <ChatHeader>Chat Header</ChatHeader>
      <MessageList>Messages List</MessageList>
      <SendMessageBox>
        <InputBox>
          <Form>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Form>
        </InputBox>
      </SendMessageBox>
    </Container>
  );
}

const Form = styled.form``;

const InputBox = styled.div`
  grid-row: 3;
`;

const SendMessageBox = styled.div`
  grid-row: 3;
`;

const ChatHeader = styled.div`
  grid-row: 1;
`;

const MessageList = styled.div`
  grid-row: 2;
`;

const Container = styled.div`
  border: solid black 2px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 7% auto 10%;
  justify-content: center;
`;

export default Chat;
