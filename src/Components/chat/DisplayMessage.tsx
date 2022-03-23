import { userContext } from "context/userContext";
import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import formatDate from "services/formatMessageDate";

function DisplayMessage({ message }: any) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { channelLogging } = useContext(userContext);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, [message]);

  return (
    <Container>
      {channelLogging && message.isLog && (
        <div className="log-container">
          <i
            ref={bottomRef}
            className="log-channel"
            style={
              (message.isJoining && { color: "#31E981" }) || {
                color: "#D7263D",
              }
            }
          >
            {formatDate(message.date)}
            {message.content}
          </i>
        </div>
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
          <span className="date">{formatDate(message.date)}</span>
          <div ref={bottomRef} className="message">
            {message.content}
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding-left: 43px;


  & .chatfinal {
    display: grid;
    grid-template-columns: 6% 1fr;
    grid-template-rows: 27% 1fr;
    margin-left: -28px;
    padding-left: 17px;
    width: 99%;
    margin-top: 3px;
    padding-top: 10px;
    border-top: 2px solid #2b2d3a;
  }

  & .log-container {
    margin-bottom: 18px;
  }

  & .log-channel {
    text-align: center;
    font-size: 12px;
    background-color: #2b2d3a;
    margin-left: 15rem;
    padding: 4px;
    padding-right: 8px;
    border-radius: 18px;
}
  }

  & .message {
    margin-left: 42px;
    font-size: 18px;
    color: #ffffff;
    grid-column: 2;
    margin-left: 4px;
}
  }

  & .date {
    grid-row: 2 span;
    grid-column: 3;
    margin-top: -16px;
    color: grey;
    font-size: 12px;
    
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
