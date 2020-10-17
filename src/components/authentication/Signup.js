import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import "./Signup.css";
import Firebase from "../../Firebase/Firebase.js";
import axios from "axios";

function Signup(props) {
  const handleSignup = (event) => {
    event.preventDefault();
    const { email, password, confirm } = event.target.elements;
    if (password.value !== confirm.value) {
      alert("Please make sure your passwords match");
      return;
    }
    Firebase.auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .catch((err) => {
        console.log("Something went wrong, please try again.");
      });

    // axios.post("/createAccount", {
    //   uid: Firebase.auth.c,
    // });
  };

  return (
    <div>
      <div className="header"></div>
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
