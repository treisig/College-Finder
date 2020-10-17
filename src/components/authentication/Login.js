import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";

function Login(props) {
  return <div>
    <div className="header">
      header
    </div>
    <div className="loginDiv">
    
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email Address: </Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
      Submit
      </Button>
    </Form>
   
  </div>
  </div>
}

export default Login;
