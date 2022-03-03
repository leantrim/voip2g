import { useState } from "react";
import Picker from "emoji-picker-react";
import styled from "styled-components";

function SendMessage() {
  const [message, setMessage] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setMessage(message + emojiObject.emoji);
  };

  const handleKeyDown = (event) => event.key === "Enter" && handleSubmit();

  const handleSubmit = () => {
    console.log(message);
    setMessage("");
  };

  const toggleEmoji = () => {
    console.log("Emoji enabled");
    let currState = showEmoji;
    setShowEmoji((currState = !currState));
  };

  return (
    <InputBox>
      {showEmoji && <Picker onEmojiClick={onEmojiClick} />}
      <form>
        <input
          type="text"
          placeholder="Message RedBull Racing..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>
      <button onClick={() => toggleEmoji()}></button>
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

  & ::placeholder {
    font-weight: 700;
    font-size: 15px;
  }
`;

export default SendMessage;
