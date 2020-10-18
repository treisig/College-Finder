import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";
import Firebase from "../../Firebase/Firebase";

function SchoolView(props) {
  const [student, setStudent] = useState(null);
  const [schoolList, setSchools] = useState(null);
  const [filters, setFilters] = useState([]);

  const addFilters = () => {};

  // on mount get initial info
  useEffect(
    () =>
      (async function () {
        const data = await axios.get(
          `http://localhost:5001/college-finder-b2385/us-central1/api/studentInfo/${Firebase.auth.currentUser.uid}`
        );
        const schools = axios.get(
          "http://localhost:5001/college-finder-b2385/us-central1/api/schools"
        );
        console.log(data.data);
        setStudent(data.data);
        setSchools(schools.data);
      })(),
    []
  );
  const handleFilters = (event) => {};

  const filterBoxes = ["Avg. SAT", "Avg. ACT", "Avg. GPA"].map((eachFilter) => (
    <Form.Check
      type="checkbox"
      // key={eachFilter}
      value={eachFilter}
      label={eachFilter}
      // onClick={handleCheck}
    />
  ));

  // if (!student) return null;

  return (
    <div>
      <div>header</div>
      <div className="schoolViewDiv">
        <div className="filtersDiv">
          <Form onSubmit={handleFilters}>
            <Form.Group controlId="ControlSelect1 checkBoxes">
              <div className="mb-3 checkBoxes">{filterBoxes}</div>
            </Form.Group>
            <Button variant="primary">Update</Button>
          </Form>
        </div>
        <div className="tableDiv">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>School Name</th>
                <th>Avg. SAT</th>
                <th>Avg. ACT</th>
              </tr>
            </thead>
            <tbody>
              {schoolList &&
                schoolList.map((schoolOBJ) => (
                  <tr>
                    <td>{schoolOBJ.name}</td>
                    <td>{schoolOBJ.SAT}</td>
                    <td>{schoolOBJ.ACT}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default SchoolView;
