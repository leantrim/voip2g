import io from "socket.io-client";

function makeSocketConnection(socket) {
  const socket = io.connect("http://192.168.1.52:5001");
  console.log(socket);

  if (!socket.connected) {
    console.log("Not connected to the socket server, awaiting connection");
  } else {
    console.log("Connected to the socket", socket);
  }
}


let socketTimer;
let isTimerStarted = false;
function checkConnection() {
  if (!socket.connected && !isTimerStarted) {
    isTimerStarted = true;
    socketTimer = setTimeout(socketConnection, 1500);
  }
}


checkConnection();

const sendMessage = async (message) => {
  await socket.emit("send_message", message);
};
