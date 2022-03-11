import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "@fortawesome/fontawesome-free/css/all.css";
import { UserContextProvider } from './context/userContext';
import { ChannelContextProvider } from './context/channelContext';
import { ClientSocketProvider } from './context/clientSocketContext';
import { ChannelSocketProvider } from './context/channelSocketContext';
import { MediaStreamProvider } from './context/mediaStreamContext';
import { ChatContextProvider } from './context/chatContext';
import Home from "./App"
import Login from './Components/user/Login';
import Signup from './Components/user/Signup';
import Page from "./pages/page"


ReactDOM.render(
  <UserContextProvider>
    <ChannelSocketProvider>
      <ChatContextProvider>
        <MediaStreamProvider>
          <ChannelContextProvider>
            <ClientSocketProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/page" element={<Page />} />
                </Routes>
              </Router>
            </ClientSocketProvider>
          </ChannelContextProvider>
        </MediaStreamProvider>
      </ChatContextProvider>
    </ChannelSocketProvider>
  </UserContextProvider>,
  document.getElementById("root")
);
