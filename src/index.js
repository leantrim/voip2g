import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'
import "@fortawesome/fontawesome-free/css/all.css";
import { UserContextProvider } from './context/userContext';
import { ChannelContextProvider } from './context/channelContext';
import { ClientSocketProvider } from './context/clientSocketContext';
import { ChannelSocketProvider } from './context/channelSocketContext';
import { MediaStreamProvider } from './context/mediaStreamContext';
import Home from "./App"
import Login from './Components/user/Login';
import Signup from './Components/user/Signup';


ReactDOM.render(
  <UserContextProvider>
    <ChannelSocketProvider>
      <MediaStreamProvider>
        <ChannelContextProvider>
          <ClientSocketProvider>
            <Router>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Signup} />
              <Route path="/login" component={Login} />
            </Router>
          </ClientSocketProvider>
        </ChannelContextProvider>
      </MediaStreamProvider>
    </ChannelSocketProvider>
  </UserContextProvider>,
  document.getElementById("root")
);
