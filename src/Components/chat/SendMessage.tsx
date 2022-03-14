import { userContext } from "context/userContext";
import { useContext, useRef } from "react";
import styled from "styled-components";
import { chatContext } from "../../context/chatContext";

function UseFocus<T extends HTMLInputElement>() {
  const htmlElRef = useRef<T>(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
}

interface data {
  content: string;
  message: string;
}

function SendMessage() {
  const [chatRef, setChatFocus] = UseFocus();
  const { handleMessageSubmit, register, handleSubmit } =
    useContext(chatContext);

  const { currentChat } = useContext(userContext);

  //setChatFocus();

  const onSubmit = (data: data) => {
    handleMessageSubmit(data);

    const options = {
      title: "VOIP2G",
      subtitle: "POKE!",
      body: data.message,
    };

    // electronApi.sendCustomNotification(options);
  };

  return (
    <>
      <InputBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            ref={chatRef}
            {...register("message")}
            placeholder={`Message ${currentChat.name}...`}
          />
        </form>
      </InputBox>
    </>
  );
}

const InputBox = styled.div`
display: inline-grid;
    grid-row: 3;
    grid-template-columns: 1% auto;

  & Form {
    width: 103%;
    height: 100%;
    grid-column: 2;
  }

  & input {
    border-radius: 8px;
    width: 95%;
    border: 0px solid;
    color: white;
    padding: 9px;
    background-color: #2b2d3a;
    outline: none;
    font-size: 18px;
}
  }

  & ::placeholder {
    font-size: 15px;
    color: #ffffff8b;
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

export default SendMessage;
