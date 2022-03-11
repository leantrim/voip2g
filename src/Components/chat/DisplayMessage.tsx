import { useEffect, useRef } from "react";
import styled from "styled-components";

function DisplayMessage({ message }: any) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, [message]);

  return (
    <Container>
      <img
        className="chat-logo"
        src={
          "https://www.bga.se/cache/e7/1200x1200-Affischer-Posters_2020-06_1926116.jpg"
        }
        alt="userLogo"
      />
      <span className="authorName">{message.author}</span>
      <div ref={bottomRef} className="message">
        {message.content}
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding-left: 43px;

  & .authorName {
    position: relative;
    bottom: 13px;
    left: 3px;
    font-weight: 900;
    font-size: 20px;
    color: #2E86AB;
}
  }

  & .message {
    margin-left: 42px;
    font-size: 18px;
    color: #ffffff;
}
  }

  & .chat-logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
export default DisplayMessage;
