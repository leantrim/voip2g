import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'
import "@fortawesome/fontawesome-free/css/all.css";
import Home from "./App"
import Login from './Components/Login';
import Signup from './Components/Signup';

ReactDOM.render(
  <Router>
    <Route exact path="/" component={Home} />
    <Route path="/register" component={Signup} />
    <Route path="/login" component={Login} />
  </Router>,
  document.getElementById("root")

)