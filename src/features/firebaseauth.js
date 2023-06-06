import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyANrwYXx1fD39eIRBHg7vqnSy6zh_-Qwsc",
  authDomain: "doctor-test-a32dc.firebaseapp.com",
  projectId: "doctor-test-a32dc",
  storageBucket: "doctor-test-a32dc.appspot.com",
  messagingSenderId: "62617207813",
  appId: "1:62617207813:web:780849ba79e8f917c5486c",
  measurementId: "G-P9R0VZT71G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

export {auth,db}