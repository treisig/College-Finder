import React from "react";
import Login from "./components/authentication/Login.js";
import Signup from "./components/authentication/Signup.js";
import SchoolView from "./components/school-view/SchoolView.js";
import Profile from "./components/student-profile/Profile.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <nav>
          <ul>
            <li>
              <Link to="/"> Login</Link>
            </li>
            <Link to="/editprofile">Profile</Link>
            <li>
              <Link to="/schoolfinder">SchoolView</Link>
            </li>
          </ul>
        </nav> */}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/schoolfinder" component={SchoolView} />
          <Route exact path="/editprofile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
