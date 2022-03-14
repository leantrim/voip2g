import styled from "styled-components";

import NewChannel from "./voiceSystem/NewChannel";
import ChannelList from "./voiceSystem/ChannelList";

function SidebarLeft() {
  return (
    <Container>
      <ChannelList />
      <NewChannel />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 3em 4fr 3em;
  height: 100%;
  border: 3px solid #2b2d3a;
  border-radius: 8px;

  & .create-new-channel {
    cursor: pointer;
    background-color: #2b2d3a;
    grid-row: 3;
  }
`;

export default SidebarLeft;
