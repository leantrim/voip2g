import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { userContext } from "context/userContext";
import UserList from "./user/UserList";

import Users from "types/Users";

function SidebarRight() {
  const { getUsers, user } = useContext(userContext);
  const [users, setCurrentUsers] = useState<Users[]>([]);

  const getAllUsers = async () => {
    const clients = await getUsers();
    setCurrentUsers(clients);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Container>
      <h5>VOIP2G Users ❤️</h5>
      {users.map((client: Users) => (
        <UserList key={client._id} user={client} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  background-color: #252832;
  border-radius: 8px;
  border: 3px solid #2b2d3a;
  overflow: auto;

  & h5 {
    margin: 20px;
    font-size: 22px;
    color: grey;
    text-align: center;
  }
`;

export default SidebarRight;
