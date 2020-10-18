import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import "./Profile.css";

function Profile(props) {
    return <div>
        <div className="header">
            <div class="header-img"></div>
            <h1> Spooky Spectacular School Selector</h1>
            <p>Find out which college is <em>screaming</em> your name </p>
        </div>
        <div class="profile-instructions">
            <h2>Update your account to find the best match for you: </h2>
        </div>
        <div className="profileDiv">
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name </Form.Label>
                        <Form.Control/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name </Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address </Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label>Address 2 </Form.Label>
                    <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City </Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State </Form.Label>
                        <Form.Control placeholder="Enter state abbreviation"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip </Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridWeightedGPA">
                        <Form.Label>Weighted GPA </Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridUnweighted GPA">
                        <Form.Label>Unweighted GPA </Form.Label>
                        <Form.Control/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridSAT">
                        <Form.Label>SAT Score </Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridACT">
                        <Form.Label>ACT Score </Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Form.Row>
                <div className="button">
                    <Button variant="primary" type="submit" id="button1">
                        Save Changes
                    </Button>
                </div>
            </Form>
        </div>
    </div>
}

export default Profile;
