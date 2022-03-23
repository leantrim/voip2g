import styled from "styled-components";
import NewChannel from "./voiceSystem/NewChannel";
import ChannelList from "./voiceSystem/ChannelList";
import SidebarHeader from "./SidebarHeader";

function SidebarLeft() {
  return (
    <Container>
      <SidebarHeader />
      <ChannelList />
      <NewChannel />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-rows: 3.6em 4fr 3em;
  height: 99%;
  width: 100%;
  border: 4px solid #2b2d3a;
  border-radius: 8px;
  background-color: #1b1e27;

  & .create-new-channel {
    cursor: pointer;
    background-color: #2b2d3a;
    grid-row: 3;
  }
`;

export default SidebarLeft;
