import styled from "styled-components";

function SidebarHeader() {
  return (
    <Container>
      <h5 className="header-title">Lean</h5>
    </Container>
  );
}

const Container = styled.div`
  grid-row: 3;
  background-color: #2b2d3a;

  & .header-title {
    font-size: 17px;
    text-align: start;
    margin-top: 10px;
    margin-left: 10px;
    color: #3ba6d3;
  }
`;

export default SidebarHeader;
