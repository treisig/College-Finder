import React from "react";
// import Login from "./components/authentication/Login.js";
// import Signup from "./components/authentication/Signup.js";
// import SchoolView from "./components/school-view/SchoolView.js";
import "./App.css";
import Profile from "./components/student-profile/Profile.js";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/schoolfinder" component={SchoolView} />
        </Switch>
      </Router> */}
      <Profile />
    </div>
  );
}

export default App;
