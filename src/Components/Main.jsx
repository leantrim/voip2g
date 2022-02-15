import io from "socket.io-client";
import SidebarLeft from "./SidebarLeft";
import auth from "../services/authService";
import "../styles/Main.css";
import { useEffect } from "react";

function Main() {
  const socket = io.connect("http://192.168.1.52:5001");
  console.log(socket);

  if (!socket.connected) {
    console.log("Not connected to the socket server, awaiting connection");
  } else {
    console.log("Connected to the socket", socket);
  }

  let socketTimer;
  let isTimerStarted = false;
  function checkConnection() {
    if (!socket.connected && !isTimerStarted) {
      isTimerStarted = true;
      socketTimer = setTimeout(socketConnection, 1500);
    }
  }

  const socketConnection = async () => {
    if (!socket.connected) {
      console.log("Attempting connection to the socket");
      socketTimer = setTimeout(socketConnection, 1500);
    } else {
      const user = auth.getCurrentUser();
      console.log("Connection successfull to the socket", socket);
      await socket.emit("join_room", "room_id");
      sendMessage("is now online!");
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
      <div className="sidebar-left">
        <SidebarLeft />
      </div>
    </div>
  );
}

export default Main;
