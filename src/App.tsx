import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import { UserContextProvider } from "./context/userContext";
import { SoundContextProvider } from "./context/soundNoticeContext";
import { ClientSocketProvider } from "./context/clientSocketContext";
import { ChannelSocketProvider } from "./context/channelSocketContext";
import { MediaStreamProvider } from "./context/mediaStreamContext";
import { ChatContextProvider } from "./context/chatContext";
import { ScreenContextProvider } from "context/screenShareContext";
import React, { Suspense, useContext, useState } from "react";
import { Circle } from "better-react-spinkit";
import styled from "styled-components";
import "./App.css";

import SidebarLeft from "./Components/SidebarLeft";
import SidebarRight from "./Components/SidebarRight";

import Login from "./Components/user/Login";
import Signup from "./Components/user/Signup";
import ScreenSharePage from "./pages/ScreenSharePage";
import ProtectedRoute from "./Components/common/ProtectedRoute";
import { ChannelContextProvider } from "context/ChannelContext";

const ChatContainer = React.lazy(
  () => import("./Components/chat/ChatContainer")
);
const VoiceChat = React.lazy(
  () => import("./Components/voiceSystem/VoiceChat")
);

const Home = () => {
  return (
    <Container>
      <div className="sub-container">
        <SidebarLeft />

        <Suspense fallback={<Circle color="#e1b542" size={65} />}>
          <ChatContainer />
          <VoiceChat />
        </Suspense>
        <SidebarRight />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 100%;
  overflow: hidden;

  & .sub-container {
    grid-gap: 18px;
    display: inline-grid;
    grid-template-columns: 15em 1fr 15em;
    overflow: hidden;
  }
`;

export default function App() {
  return (
    <UserContextProvider>
      <SoundContextProvider>
        <ChannelSocketProvider>
          <ChatContextProvider>
            <MediaStreamProvider>
              <ChannelContextProvider>
                <ClientSocketProvider>
                  <ScreenContextProvider>
                    <Router>
                      <Routes>
                        <Route path="/" element={<ProtectedRoute />}>
                          <Route path="/" element={<Home />} />
                        </Route>
                        <Route path="/register" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                          path="/screenSharePage"
                          element={<ScreenSharePage />}
                        />
                      </Routes>
                    </Router>
                  </ScreenContextProvider>
                </ClientSocketProvider>
              </ChannelContextProvider>
            </MediaStreamProvider>
          </ChatContextProvider>
        </ChannelSocketProvider>
      </SoundContextProvider>
    </UserContextProvider>
  );
}
