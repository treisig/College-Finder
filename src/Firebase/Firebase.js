import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import config from "./config.json";

// Use this class to access firebase SDK
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }
}

export default new Firebase();
