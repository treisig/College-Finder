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

app.get("/studentInfo/:uid", async (req, res) => {
  const data = await firestore.collection("users").doc(req.params.uid).get();
  res.send(data.data());
});

app.get("/schools", async (req, res) => {
  const data = await firestore.collection("schools").get();
  // console.log(data);
  const docs = data.docs.map((doc) => doc.data());
  // console.log(docs);
  res.send(docs);
});

app.post("/findSchools", (req, res) => {
  // const { gpa, act, sat, location, distance } = req.body;
  const { act, sat, schoolsArr, filters } = req.body;
  // put code here for the school queries

  if (filters.length === 0) res.send(schoolsArr);

  const filteredSchools = filters.reduce((acc, curr) => {
    // skip GPA until we get more data
    if (curr === "GPA") return acc;
    const type = curr === "SAT scores" ? "sat 25th" : "act 25th";
    const val = curr === "SAT scores" ? parseInt(sat) : parseInt(act);
    return acc.filter((school) => val >= parseInt(school[type]));
  }, schoolsArr);

  // const filteredSchools = schoolsArr.filter(
  //   (school) =>
  //     parseInt(act) >= school["act 25th"] && parseInt(act) >= school["act 25th"]
  // );
  // then filter by distance eventually

  res.send(filteredSchools);
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
