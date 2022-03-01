import SidebarLeft from "./SidebarLeft";
import "../styles/Main.css";
import Header from "./Header";
import Chat from "./Chat";
import Footer from "./Footer";
import VoiceChat from "./VoiceChat";

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
          <div className="body-container">
            <Chat />
            <VoiceChat />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
