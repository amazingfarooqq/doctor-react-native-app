import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirebasestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkc9OimM4LIfWXf2rUdXdFsjN6X4k-hqM",
  authDomain: "doctor-clinino.firebaseapp.com",
  projectId: "doctor-clinino",
  storageBucket: "doctor-clinino.appspot.com",
  messagingSenderId: "355525454025",
  appId: "1:355525454025:web:3239de97ac999ea6600518",
  measurementId: "G-3X12SXH960"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirebasestore(app)

export {auth,db}