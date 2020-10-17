const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");

/* Manually create this file, using json data downloaded at 
firebase console-> project settings-> service accounts-> generate private key.*/
const adminConfig = require("./adminConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(adminConfig),
  databaseURL: "https://college-finder-b2385.firebaseio.com",
});

const firestore = admin.firestore();
const auth = admin.auth;

app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Yoooooo what up users!");
});

app.post("/findSchools", (req, res) => {
  const { gpa, act, sat, location, distance } = req.body;
  // put code here for the school queries

  // then filter by distance

  res.send(distance);
});

// creates a new student account in the database
app.post("/createAccount", async (req, res) => {
  const {
    uid,
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
  } = req.body;

  const studentData = {
    ["UID"]: uid,
    ["First Name"]: fname,
    ["Last Name"]: lname,
    ["Address"]: address,
    ["Address 2"]: address2,
    ["City"]: city,
    ["State"]: state,
    ["Zip"]: zip,
    ["Weighted GPA"]: weightedGPA,
    ["Unweighted GPA"]: unweightedGPA,
    ["SAT"]: SAT,
    ["ACT"]: ACT,
  };

  await firestore
    .collection("users")
    .doc(uid)
    .set(studentData)
    .catch((err) => res.status(400).send(err));
  res.status(201).send();
});

exports.api = functions.https.onRequest(app);
