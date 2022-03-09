import React, { Suspense, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { chatContext } from "../../context/chatContext";
import { Circle } from "better-react-spinkit";

const Picker = React.lazy(() => import("emoji-picker-react"));

function EmojiContain({ closeModal }: any) {
  const { showEmoji, onEmojiClick } = useContext(chatContext);

  return (
    <EmojiContainer>
      <Suspense
        fallback={
          <div>
            <Circle color="#e1b542" size={60} />
          </div>
        }
      >
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
      </Suspense>
    </EmojiContainer>
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

export default EmojiContain;
