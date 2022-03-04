import React, { Suspense } from "react";
import { Circle } from "better-react-spinkit";
import SidebarLeft from "./SidebarLeft";
import "../styles/Main.css";
import Header from "./Header";
import Footer from "./Footer";
import SidebarRight from "./SidebarRight";
const Chat = React.lazy(() => import("./chat/ChatContainer"));
const VoiceChat = React.lazy(() => import("./voiceSystem/VoiceChat"));

function Main() {
  return (
    <>
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
            <Suspense fallback={<Circle color="#e1b542" size={60} />}>
              <Chat />
              <VoiceChat />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
