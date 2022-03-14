import { userContext } from "context/userContext";
import { useContext, useEffect, useRef } from "react";
import moment from "moment";
import styled from "styled-components";

function DisplayMessage({ message }: any) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { channelLogging } = useContext(userContext);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, [message]);

  const formatDate = (date: any) => {
    // Format date
    let message_date = moment(date).format("YYYY-MM-DD H:mm z");

    // Format current date
    let dateToday = Date.now();
    const constcurrentDate = moment(dateToday).format("YYYY-MM-DD H:mm z");

    const difference = (Date.now() - date) / 1000;

    const timer = Math.floor(difference);

    const messageDay = new Date(date).getDate();
    const currentDay = new Date(dateToday).getDate();

    if (timer < 10) return "just now ";

    if (timer < 60) {
      return timer + "s ago ";
    }

    if (currentDay - messageDay === 1) {
      message_date = moment(date).format("H:mm z");
      return "yesterday " + message_date;
    }

    // if message was sent within 3600 seconds (one hour);
    if (timer < 3600) return Math.floor(timer / 60) + "m ago ";

    if (messageDay === currentDay) {
      message_date = moment(date).format("H:mm z");
      return "today " + message_date;
    }

    return message_date;
  };

  return (
    <Container>
      {channelLogging && message.isLog && (
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
            {formatDate(message.date)}
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


  padding-left: 43px;

  & .log-channel {
    text-align: center;
    font-size: 12px;
    background-color: #103544;
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

  & .date {
    grid-row: 2 span;
    grid-column: 3;
    margin-top: -16px;
    color: grey;
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
