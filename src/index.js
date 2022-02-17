import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'
import { ContextProvider } from './context/SocketContext';
import { UserContextProvider } from './context/userContext';
import { ChannelContextProvider } from './context/channelContext';
import "@fortawesome/fontawesome-free/css/all.css";
import Home from "./App"
import Login from './Components/Login';
import Signup from './Components/Signup';

ReactDOM.render(
  <ChannelContextProvider>
    <UserContextProvider>
      <ContextProvider>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Signup} />
          <Route path="/login" component={Login} />
        </Router>
      </ContextProvider>,
    </UserContextProvider>,
  </ChannelContextProvider>,
  document.getElementById("root")
);