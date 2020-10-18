import React from "react";
import { Form, Button, Col } from "react-bootstrap";
import "./Profile.css";
import axios from "axios";
import Firebase from "../../Firebase/Firebase";

function Profile(props) {
  // sends changes to Firebase
  const handleEditInfo = async (event) => {
    event.preventDefault();
    const {
      fname,
      lname,
      address,
      address2,
      city,
      state,
      zip,
      weightedGPA,
      unweightedGPA,
      SAT,
      ACT,
    } = event.target.elements;

    await axios.post(
      "http://localhost:5001/college-finder-b2385/us-central1/api/createAccount",
      {
        uid: Firebase.auth.currentUser.uid,
        fname: fname.value,
        lname: lname.value,
        address: address.value,
        address2: address2.value,
        city: city.value,
        state: state.value,
        zip: zip.value,
        weightedGPA: weightedGPA.value,
        unweightedGPA: unweightedGPA.value,
        SAT: SAT.value,
        ACT: ACT.value,
      }
    );

    props.updateView();
  };

  return (
    <div>
      <div className="header"></div>
      <div className="profileDiv">
        <Form onSubmit={handleEditInfo}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name </Form.Label>
              <Form.Control name="fname" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last Name </Form.Label>
              <Form.Control name="lname" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address </Form.Label>
            <Form.Control name="address" placeholder="1234 Main St" />
          </Form.Group>

          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2 </Form.Label>
            <Form.Control
              name="address2"
              placeholder="Apartment, studio, or floor"
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City </Form.Label>
              <Form.Control name="city" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State </Form.Label>
              <Form.Control
                name="state"
                placeholder="Enter state abbreviation"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip </Form.Label>
              <Form.Control name="zip" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridWeightedGPA">
              <Form.Label>Weighted GPA </Form.Label>
              <Form.Control name="weightedGPA" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridUnweighted GPA">
              <Form.Label>Unweighted GPA </Form.Label>
              <Form.Control name="unweightedGPA" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridSAT">
              <Form.Label>SAT Score </Form.Label>
              <Form.Control name="SAT" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridACT">
              <Form.Label>ACT Score </Form.Label>
              <Form.Control name="ACT" />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Profile;
