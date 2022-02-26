import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'
import { VoiceContextProvider } from './context/VoiceContextProvider';
import { UserContextProvider } from './context/userContext';
import { ChannelContextProvider } from './context/channelContext';
import { ClientSocketProvider } from './context/clientSocketContext';
import "@fortawesome/fontawesome-free/css/all.css";
import Home from "./App"
import Login from './Components/Login';
import Signup from './Components/Signup';
import { ChannelSocketProvider } from './context/channelSocketContext';


ReactDOM.render(
  <UserContextProvider>
    <ChannelSocketProvider>
      <ChannelContextProvider>
        <ClientSocketProvider>
          <VoiceContextProvider>
            <Router>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Signup} />
              <Route path="/login" component={Login} />
            </Router>
          </VoiceContextProvider>
        </ClientSocketProvider>
      </ChannelContextProvider>
    </ChannelSocketProvider>
  </UserContextProvider>,
  document.getElementById("root")
);
