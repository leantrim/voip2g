import { useContext, useEffect } from "react";
import io from "socket.io-client";
import { userContext } from "../context/userContext";
import SidebarLeft from "./SidebarLeft";
import "../styles/Main.css";

//TODO usercontext, refactor socket(REWORK?) connection code to services file

function Main() {
  const { user, logOutUser, getCustomUser } = useContext(userContext);
  const socket = io.connect("http://192.168.1.52:5001");
  console.log(socket);

  if (!socket.connected) {
    console.log("Not connected to the socket server, awaiting connection");
  } else {
    console.log("Connected to the socket", socket);
  }

  let isTimerStarted = false;
  function checkConnection() {
    if (!socket.connected && !isTimerStarted) {
      isTimerStarted = true;
      setTimeout(socketConnection, 3000);
    }
  }

  const socketConnection = async () => {
    if (!socket.connected) {
      console.log("Attempting connection to the socket");
      setTimeout(socketConnection, 3000);
    } else {
      console.log("Connection successfull to the socket", socket);
      await socket.emit("join_room", "room_id");
      sendMessage(`${user.name} is now online!`);
    }
  };

  checkConnection();

  const sendMessage = async (message) => {
    await socket.emit("send_message", message);
  };

  useEffect(() => {
    console.log("called");
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="main-container">
      <div className="header-container">
        <button onClick={() => logOutUser()}></button>
      </div>
      <div className="sidebar-left">
        <SidebarLeft />
      </div>
    </div>
  );
}

export default Main;
