import React, { Suspense, useContext, useEffect } from "react";
import { Circle } from "better-react-spinkit";
import "./styles/Main.css";
import "./App.css";
import Footer from "Components/Footer";
import Header from "Components/Header";
import SidebarLeft from "Components/SidebarLeft";
import SidebarRight from "Components/SidebarRight";
import { userContext } from "context/userContext";

const Chat = React.lazy(() => import("Components/chat/ChatContainer"));
const VoiceChat = React.lazy(() => import("Components/voiceSystem/VoiceChat"));

function App() {
  const { loadUserInfo } = useContext(userContext);

  useEffect(() => {}, [loadUserInfo]);

  return (
    <div className="main-container">
      <div className="footer">
        <Footer />
      </div>
      <div className="header-container">
        <Header />
      </div>
      <div className="sub-container">
        <div className="sidebar-left">
          <SidebarLeft />
        </div>
        <div className="sidebar-right">
          <SidebarRight />
        </div>
        <div className="body-container">
          <Suspense fallback={<Circle color="#e1b542" size={65} />}>
            <Chat />
            <VoiceChat />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
