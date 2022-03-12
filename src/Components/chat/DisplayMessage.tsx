import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

function DisplayMessage({ message }: any) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, [message]);

  return (
    <Container>
      {message.isLog && (
        <>
          <div
            ref={bottomRef}
            className="log-channel"
            style={
              (message.isJoining && { color: "#31E981" }) || {
                color: "#D7263D",
              }
            }
          >
            {message.content}
          </div>
        </>
      )}
      {message.author && (
        <div className="chatfinal">
          <img
            className="chat-logo"
            src={
              message.author.userLogo ||
              "https://media.discordapp.net/attachments/767507305410985996/891677533538484264/vp3-nobg.png?width=671&height=671"
            }
            alt="userLogo"
          />
          <span className="authorName">{message.author.name}</span>
          <div ref={bottomRef} className="message">
            {message.content}
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  & .chatfinal {
    display: inline-grid;
    grid-template-columns: 6% 1fr;
    grid-template-rows: 27% 1fr;
    margin-left: -42px;
    width: 99%;
    margin-top: 3px;
  }


  padding-left: 43px;

  & .log-channel {
    text-align: center;
    font-size: 12px;
    background-color: #2b2d3a;
    margin-right: 14rem;
    margin-left: 14rem;
    border-radius: 18px;
    margin-bottom: 8px;
  }

  & .message {
    margin-left: 42px;
    font-size: 18px;
    color: #ffffff;
    grid-column: 2;
    margin-left: 4px;
}
  }

  & .authorName {
    position: relative;
    bottom: 13px;
    left: 3px;
    font-weight: 900;
    font-size: 20px;
    color: #2e86ab;
  }

  & .chat-logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 6px;
  }
`;
export default DisplayMessage;
