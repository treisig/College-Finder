import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import "./Signup.css";
import Firebase from "../../Firebase/Firebase.js";
import { Redirect } from "react-router-dom";

// import axios from "axios";

function Signup(props) {
  const [location, setLocation] = useState(null);

  const handleSignup = async (event) => {
    event.preventDefault();
    const { email, password, confirm } = event.target.elements;
    if (password.value !== confirm.value) {
      alert("Please make sure your passwords match");
      return;
    }
    await Firebase.auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .catch((err) => {
        console.log("Something went wrong, please try again.");
      });

    // await axios
    //   .post(
    //     "http://localhost:5001/college-finder-b2385/us-central1/api/createAccount",
    //     {
    //       email: email.value,
    //     }
    //   )
    //   .catch((err) => console.log(err));

    await Firebase.auth
      .signInWithEmailAndPassword(email.value, password.value)
      .catch((err) => {
        alert("Your email or password is incorrect");
      });

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
      <div class="signup-instructions">
        <h2>Enter your information to <br></br>create an account: </h2>
      </div>
      <div className="signupDiv">
        <Form onSubmit={handleSignup}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email: </Form.Label>
              <Form.Control name="email" type="email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password: </Form.Label>
              <Form.Control name="password" type="password" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Confirm Password: </Form.Label>
              <Form.Control name="confirm" type="password" />
            </Form.Group>
          </Form.Row>
        <div className="button">
          <Button variant="primary" type="submit" id="button1">
            Submit
          </Button>
        </div>
        </Form>
      </div>
      {location}
    </div>
  );
}

export default Signup;
