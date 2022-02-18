import SidebarLeft from "./SidebarLeft";
import "../styles/Main.css";
import Header from "./Header";
import Chat from "./Chat";

function Main() {
  return (
    <>
      <div className="main-container">
        <div className="header-container">
          <Header />
        </div>
        <div className="sub-container">
          <div className="sidebar-left">
            <SidebarLeft />
          </div>
          <div className="body-container">
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
