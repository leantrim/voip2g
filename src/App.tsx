import React, { Suspense, useContext, useEffect } from "react";
import { Circle } from "better-react-spinkit";
import styled from "styled-components";
import "./App.css";
import Footer from "Components/Footer";
import Header from "Components/Header";
import SidebarLeft from "Components/SidebarLeft";
import SidebarRight from "Components/SidebarRight";
import { userContext } from "context/userContext";

const ChatContainer = React.lazy(() => import("Components/chat/ChatContainer"));
const VoiceChat = React.lazy(() => import("Components/voiceSystem/VoiceChat"));

function App() {
  const { loadUserInfo } = useContext(userContext);

  useEffect(() => {}, [loadUserInfo]);

  return (
    <Container>
      <Header />
      <div className="sub-container">
        <SidebarLeft />
        <SidebarRight />

        <Suspense fallback={<Circle color="#e1b542" size={65} />}>
          <ChatContainer />
          <VoiceChat />
        </Suspense>
      </div>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 5% 90% 5%;
  overflow: hidden;

  & .sub-container {
    grid-gap: 0px;
    display: inline-grid;
    grid-template-columns: 15em 1fr 15em;
    overflow: hidden;
  }
`;

export default App;
