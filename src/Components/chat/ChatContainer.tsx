import { screenContext } from "context/screenShareContext";
import { useContext } from "react";
import styled, { css } from "styled-components";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import SendMessage from "./SendMessage";
import VideoScreenPlayer from "./VideoScreenPlayer";

interface IProps {
  watchingStream: boolean;
}

function SendChatMessage() {
  const { watchingStream } = useContext(screenContext);
  return (
    <Container watchingStream={watchingStream}>
      {watchingStream && <VideoScreenPlayer />}

      <ChatHeader watchingStream={watchingStream} />

      <MessageList />

      <SendMessage watchingStream={watchingStream} />
    </Container>
  );
}

const Container = styled.div<IProps>`
  display: grid;
  background-color: #1b1e27;
  overflow: hidden;
  width: 100%;
  height: 99%;
  justify-content: center;
  border: 4px solid #2b2d3a;
  border-radius: 8px;

  grid-template-rows: 7% auto 7%;
  grid-template-columns: 100%;

  ${({ watchingStream }) =>
    watchingStream &&
    css`
      grid-template-rows: 1fr 7% 10% 6%;
    `}
`;

export default SendChatMessage;
