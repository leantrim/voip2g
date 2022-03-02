import { useState } from "react";
import styled from "styled-components";

function SendMessage() {
  const [message, setMessage] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) =>
    event.key === "Enter" && handleSubmit();

  const handleSubmit = () => {
    console.log(message);
    setMessage("");
  };

  return (
    <InputBox>
      <form>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>
    </InputBox>
  );
}

const InputBox = styled.div`
  grid-row: 3;

  & Form {
    background-color: red;
  }
`;

export default SendMessage;
