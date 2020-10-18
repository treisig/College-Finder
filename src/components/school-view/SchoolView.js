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
  // const [distance, setDistance] = useState("");

  const sendFilters = async () => {
    const data = await axios.post(
      "https://us-central1-college-finder-b2385.cloudfunctions.net/api/findSchools",
      {
        act: student["ACT"],
        sat: student["SAT"],
        schoolsArr: allSchools,
        filters: filters,
      }
    );
    // // will filter out by distance
    // if (distance !== "") {
    //   const userCity = student["City"];
    //   const userState = student["State"];
    //   const userData = await axios.get(
    //     `https://us1.locationiq.com/v1/search.php?key=${key}&city=${userCity}&state=${userState}&format=json`
    //   );
    //   const userLat = userData.lat;
    //   const userLon = userData.lon;
    //   let tempList = data.data.filter(
    //     (schoolOBJ) =>
    //       schoolOBJ.name !== "University of North Carolina at Chapel Hill"
    //   );

    //   tempList = tempList.filter((schoolOBJ) => {
    //     const myDistance = calculateDistance(
    //       userLat,
    //       userLon,
    //       schoolOBJ["lat"],
    //       schoolOBJ["lon"]
    //     );
    //     return myDistance <= distance;
    //   });
    //   console.log(tempList);
    //   setSchools(tempList);
    //   return;
    // }

    setSchools(data.data);
  };

  // // FROM https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
  // // calculates distance
  // function calculateDistance(lat1, lon1, lat2, lon2) {
  //   const p = 0.017453292519943295; // Math.PI / 180
  //   const c = Math.cos;
  //   const a =
  //     0.5 -
  //     c((lat2 - lat1) * p) / 2 +
  //     (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  //   return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  // }

  const updateView = () => {
    setView(!profileView);
  };
  // on mount get initial info
  useEffect(
    () =>
      (async function () {
        const data = await axios.get(
          `https://us-central1-college-finder-b2385.cloudfunctions.net/api/studentInfo/${Firebase.auth.currentUser.uid}`
        );
        const schools = await axios.get(
          "https://us-central1-college-finder-b2385.cloudfunctions.net/api/schools"
        );
        setStudent(data.data);
        setSchools(schools.data);
        setAllSchools(schools.data);
      })(),
    []
  );
  const addFilters = (event) => {
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

  if (profileView) return <Profile updateView={updateView} />;

  return (
    schoolList && (
      <div className="studentWrapper">
        <div className="header">
          <div class="header-img"></div>
          <h1> Spooky Spectacular School Selector</h1>
          <p>
            Find out which college is <em>screaming</em> your name{" "}
          </p>
        </div>
        <div className="schoolViewDiv">
          <div className="filtersDiv">
            <h4>Filters</h4>
            <Form>
              <Form.Group
                className="checkboxGroup"
                controlId="ControlSelect checkBoxes"
              >
                <div className="checkBoxes">{filterBoxes}</div>
              </Form.Group>
              <Button
                variant="primary"
                className="filterBtn"
                onClick={sendFilters}
              >
                Submit Filters
              </Button>
            </Form>
            <Link onClick={() => updateView()} style={{ color: "black" }}>
              Click me to update your information!
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
