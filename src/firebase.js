
import {initializeApp} from "firebase/app"
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBDBSlDgOhdWSgGw6JPCCtRUalNpmLYpPE",
  authDomain: "easy-access-test.firebaseapp.com",
  projectId: "easy-access-test",
  storageBucket: "easy-access-test.appspot.com",
  messagingSenderId: "545339943333",
  appId: "1:545339943333:web:be95a0cf48acc94a07604c",
  measurementId: "G-92WGNR4C4R"
};

// Initialize Firebase
//const firebaseapp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebaseapp);


const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

export {app, firebaseAuth}