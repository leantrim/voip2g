import styled from "styled-components";
import { logo } from "../config.json";

function Header() {
  return (
    <Container>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="user">
        <h3>Lean</h3>
      </div>
    </Container>
  );
}

const Container = styled.header`
  justify-content: center;
  grid-row: 1;
  background-color: #1b1e27;

  .head-container {
    display: inline-grid;
    grid-row: 1;
    grid-template-columns: repeat(12, minmax(70px, 1fr));
    justify-content: center;
  }

  & .logo {
    grid-column: 1;
  }

  & .user {
    grid-column: 12;
  }

  & .logo > img {
    grid-column: 3;
    width: 50px;
    height: 50px;
  }
`;

export default Header;
