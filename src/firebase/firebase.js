
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
//import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAV4yOrha15E3tC2imheVj6jHrJlXkFiGU",
  authDomain: "easy-access-test-c1f42.firebaseapp.com",
  projectId: "easy-access-test-c1f42",
  storageBucket: "easy-access-test-c1f42.appspot.com",
  messagingSenderId: "724792281936",
  appId: "1:724792281936:web:9e6d75b34818d344673a55"
};
// Initialize Firebase
//const analytics = getAnalytics(firebaseapp);

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const db = getFirestore(app)

export {app, firebaseAuth, db}