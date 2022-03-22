import styled from "styled-components";
import { logo } from "../config.json";

function Header() {
  return (
    <Container>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
    </Container>
  );
}

const Container = styled.header`
  background-color: #1b1e27;
  display: inline-grid;
  grid-row: 1;
  grid-template-columns: repeat(12, minmax(70px, 1fr));
  justify-content: center;

  & .logo {
    grid-column: 1;
  }

  & .user {
    grid-column: 12;
  }

  & .logo > img {
    grid-column: 3 / auto;
    width: 37px;
    height: 37px;
  }
`;

export default Header;
