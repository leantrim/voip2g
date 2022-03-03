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
          placeholder="Message RedBull Racing"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>
    </InputBox>
  );
}

const InputBox = styled.div`
  display: inline-grid;
  grid-row: 3;
  grid-template-columns: 3% auto 3%;

  & Form {
    width: 100%;
    height: 100%;
    grid-column: 2;
  }

  & input {
    border-radius: 8px;
    width: 98%;
    border: 0px solid;
    color: #cea335;
    padding: 9px;
    background-color: #0c1532;
    outline: none;
  }
`;

export default SendMessage;
