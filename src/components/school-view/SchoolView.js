import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";
import Firebase from "../../Firebase/Firebase";
import { Link, Redirect } from "react-router-dom";
import Profile from "../student-profile/Profile.js";
import "./SchoolView.css";

function SchoolView(props) {
  const [student, setStudent] = useState(null);
  const [allSchools, setAllSchools] = useState(null);
  const [schoolList, setSchools] = useState(null);
  const [filters, setFilters] = useState([]);
  const [profileView, setView] = useState(false);

  const sendFilters = async () => {
    console.log(filters);
    const data = await axios.post(
      "http://localhost:5001/college-finder-b2385/us-central1/api/findSchools",
      {
        act: student["ACT"],
        sat: student["SAT"],
        schoolsArr: allSchools,
        filters: filters,
      }
    );
    console.log(data.data);
    setSchools(data.data);
  };

  const updateView = () => {
    setView(!profileView);
  };
  // on mount get initial info
  useEffect(
    () =>
      (async function () {
        const data = await axios.get(
          `http://localhost:5001/college-finder-b2385/us-central1/api/studentInfo/${Firebase.auth.currentUser.uid}`
        );
        const schools = await axios.get(
          "http://localhost:5001/college-finder-b2385/us-central1/api/schools"
        );
        setStudent(data.data);
        setSchools(schools.data);
        setAllSchools(schools.data);
      })(),
    []
  );
  const addFilters = (event) => {
    console.log(filters);
    // adds the check to the list
    if (event.target.checked) {
      const tempList = filters;
      tempList.push(event.target.value);
      setFilters(tempList);
    } else {
      // removes the check from the list
      let tempList = filters;
      tempList = tempList.filter((name) => name !== event.target.value);
      setFilters(tempList);
    }
  };

  const filterBoxes = ["SAT scores", "ACT scores", "GPA"].map((eachFilter) => (
    <Form.Check
      type="checkbox"
      value={eachFilter}
      label={eachFilter}
      onClick={addFilters}
    />
  ));

  // if (!student) return null;

  if (profileView) return <Profile updateView={updateView} />;

  return (
    schoolList && (
      <div>
        <div>header</div>
        <div className="schoolViewDiv">
          <div className="filtersDiv">
            <Form>
              <Form.Group controlId="ControlSelect checkBoxes">
                <div className="mb-3 checkBoxes">{filterBoxes}</div>
              </Form.Group>
              <Button variant="primary" onClick={sendFilters}>
                Submit Filters
              </Button>
            </Form>
            <Link onClick={() => updateView()}>
              Update your information here!
            </Link>
          </div>
          <div className="tableDiv">
            <Table striped bordered hover variant="dark" className="tables">
              <thead>
                <tr>
                  <th>School Name</th>
                  <th>SAT 25th Percentile</th>
                  <th>SAT 75th Percentile</th>
                  <th>ACT 25th Percentile</th>
                  <th>ACT 75th Percentile</th>
                </tr>
              </thead>
              <tbody>
                {schoolList &&
                  schoolList.map((schoolOBJ) => (
                    <tr>
                      <td>{schoolOBJ.name}</td>
                      <td>{schoolOBJ["sat 25th"]}</td>
                      <td>{schoolOBJ["sat 75th"]}</td>
                      <td>{schoolOBJ["act 25th"]}</td>
                      <td>{schoolOBJ["act 75th"]}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  );
}

export default SchoolView;
