import styled from "styled-components";

function UserList({ user }: any) {
  return (
    <Container>
      <img className="user-logo" src={user.userLogo} />
      <span className="user-name">{user.name}</span>
    </Container>
  );
}

const Container = styled.div`
  cursor: pointer;
  & .user-name:hover {
    color: grey;
    font-size: 24px;
  }

  & .user-name {
    font-size: 20px;
    color: #2e86ab;
  }

  & .user-logo {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
    margin: 10px;
  }
`;

export default UserList;
