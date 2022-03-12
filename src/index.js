import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "@fortawesome/fontawesome-free/css/all.css";
import { UserContextProvider } from './context/userContext';
import { SoundContextProvider } from './context/soundNoticeContext';
import { ChannelContextProvider } from './context/channelContext';
import { ClientSocketProvider } from './context/clientSocketContext';
import { ChannelSocketProvider } from './context/channelSocketContext';
import { MediaStreamProvider } from './context/mediaStreamContext';
import { ChatContextProvider } from './context/chatContext';
import Home from "./App"
import Login from './Components/user/Login';
import Signup from './Components/user/Signup';
import Page from "./pages/page"
import ProtectedRoute from 'Components/common/ProtectedRoute';

ReactDOM.render(
  <UserContextProvider>
    <SoundContextProvider>
      <ChannelSocketProvider>
        <ChatContextProvider>
          <MediaStreamProvider>
            <ChannelContextProvider>
              <ClientSocketProvider>
                <Router>
                  <Routes>
                    <Route exact path='/' element={<ProtectedRoute />}>
                      <Route exact path='/' element={<Home />} />
                    </Route>
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
    </SoundContextProvider>
  </UserContextProvider>,
  document.getElementById("root")
);
