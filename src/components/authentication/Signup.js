import React from "react";
import { Form, Button, Col} from "react-bootstrap";
import "./Signup.css";

function Signup(props) {
    return <div>
      <div className="header">
        
      </div>
      <div className="signupDiv">
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control type="email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Confirm Password: </Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
      </div>
  </div>
}

export default Signup;