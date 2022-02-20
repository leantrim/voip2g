import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'
import { ContextProvider } from './context/voiceSocket';
import { UserContextProvider } from './context/userContext';
import { ChannelContextProvider } from './context/channelContext';
import { ClientSocketProvider } from './context/clientSocketContext';
import "@fortawesome/fontawesome-free/css/all.css";
import Home from "./App"
import Login from './Components/Login';
import Signup from './Components/Signup';


ReactDOM.render(
  <UserContextProvider>
    <ChannelContextProvider>
      <ClientSocketProvider>
        <ContextProvider>
          <Router>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Signup} />
            <Route path="/login" component={Login} />
          </Router>
        </ContextProvider>
      </ClientSocketProvider>
    </ChannelContextProvider>
  </UserContextProvider>,
  document.getElementById("root")
);
