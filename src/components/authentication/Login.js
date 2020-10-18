import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import { Redirect } from "react-router-dom";
import Firebase from "../../Firebase/Firebase.js";

function Login(props) {
  const [location, setLocation] = useState(null);
  // sends login info to firebase for verification
  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    console.log(email.value + " " + password.value);

    await Firebase.auth
      .signInWithEmailAndPassword(email.value, password.value)
      .catch((err) => {
        alert("Your email or password is incorrect");
      });

    // makes sure that you are a valid user before going to next page
    if (Firebase.auth.currentUser != null) {
      setLocation(<Redirect to="/schoolfinder" />);
    }
  };
  return (
    <div>
      <div className="header">
        <div class="header-img"></div>
        <h1> 
          Spooky Spectacular School Selector
        </h1>
        <p>Find out which college is <em>screaming</em> your name </p>
      </div>
      <div class="login-instructions">
        <h2>Enter your log in information: </h2>
      </div>
      <div className="loginDiv">
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address: </Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <div className="button">
          < Button variant="primary" type="submit" id="button1">
             Submit
          </Button>
          </div>
          </Form>
      </div>
      {location}
    </div>
  );
}

export default Login;
