import styled from "styled-components";

function SidebarHeader() {
  return (
    <Container>
      <h5>Channels</h5>
    </Container>
  );
}

const Container = styled.div`
  grid-row: 1;
  background-color: #2b2d3a;
`;

export default SidebarHeader;
