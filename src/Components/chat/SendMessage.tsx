import { userContext } from "context/userContext";
import { useContext, useRef } from "react";
import styled, { css } from "styled-components";
import { chatContext } from "../../context/chatContext";
import electronApi from "services/electronApi";

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

interface IProps {
  watchingStream: boolean;
}

function SendMessage({ watchingStream }: IProps) {
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
      <InputBox watchingStream={watchingStream}>
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

const InputBox = styled.div<IProps>`
display: inline-grid;
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

  ${({ watchingStream }) =>
    watchingStream &&
    css`
      grid-template-rows: 1fr 7% 10% 6%;
    `}


`;

export default SendMessage;
