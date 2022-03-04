import React, { Suspense } from "react";
import styled from "styled-components";
import { Circle } from "better-react-spinkit";
import { useContext } from "react";
import { chatContext } from "../../context/chatContext";

const Picker = React.lazy(() => import("emoji-picker-react"));

function MessageList() {
  const { showEmoji, onEmojiClick } = useContext(chatContext);

  return (
    <Container>
      <h1>Message List</h1>
      <EmojiContainer>
        <Suspense
          fallback={
            <div>
              <Circle color="#e1b542" size={60} />
            </div>
          }
        >
          {showEmoji && (
            <Picker
              groupVisibility={{
                recently_used: false,
                food_drink: false,
                travel_places: false,
                activities: false,
                objects: false,
                symbols: false,
                flags: false,
                animals_nature: false,
              }}
              disableSearchBar
              pickerStyle={{
                boxShadow: "none",
                background: "#152355",
                border: "none",
                overflow: "hidden",
              }}
              onEmojiClick={onEmojiClick}
            />
          )}
        </Suspense>
      </EmojiContainer>
    </Container>
  );
}

const EmojiContainer = styled.div`
  grid-row: 2;
  grid-column: 2;

  & .emoji-scroll-wrapper::-webkit-scrollbar {
    display: none;
  }

  & .emoji-group:before {
    overflow: hidden;
    background-color: #152355;
    color: #e1b542;
    font-size: 14px;
  }

  & .emoji-search {
    background-color: #152355;
    border: none;
  }

  & .emoji-group {
    background-color: #152355;
  }
`;

const Container = styled.div`
  grid-row: 2;
  display: inline-grid;
  grid-template-columns: 1fr 24em;
  grid-template-rows: 1fr 20em;
`;

export default MessageList;
