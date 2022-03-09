import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { chatContext } from "../../context/chatContext";

const UseFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

function SendMessage() {
  const [chatRef, setChatFocus] = UseFocus();
  const { emoji, setMessage, handleMessageSubmit, message } =
    useContext(chatContext);

  setChatFocus();

  return (
    <>
      <InputBox>
        <form>
          <input
            ref={chatRef}
            type="text"
            placeholder="Message RedBull Racing..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(event) =>
              event.key === "Enter" && handleMessageSubmit()
            }
          />
        </form>
        <i className="fa-solid fa-face-grin-wink"></i>
      </InputBox>
    </>
  );
}

const InputBox = styled.div`
  display: inline-grid;
  grid-row: 3;
  grid-template-columns: 5% auto 8%;

  & Form {
    width: 103%;
    height: 100%;
    grid-column: 2;
  }

  & input {
    border-radius: 8px;
    width: 100%;
    border: 0px solid;
    color: #cea335;
    padding: 9px;
    background-color: #0c1532;
    outline: none;
    font-size: 18px;
  }

  & ::placeholder {
    font-weight: 700;
    font-size: 15px;
  }

  & .fa-solid {
    cursor: pointer;
    font-size: 28px;
    grid-column: 3;
    margin-top: 13px;
  }

  .fa-face-grin-wink:hover:before {
    color: #ab9240;
    margin-top: 10px;
    font-size: 32px;
  }

  & .Picker {
  }
`;

// .fa-face-grin-wink::before {
//   content: "\f58c";
//   cursor: pointer;
//   font-size: 28px;
//   grid-column: 3;
//   margin-top: 7px;
// }

export default SendMessage;
