// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwiOQOJ5CfFMCdvf1QL__fx2YMP8mlk1A",
  authDomain: "icebreaker-ff419.firebaseapp.com",
  projectId: "icebreaker-ff419",
  storageBucket: "icebreaker-ff419.appspot.com",
  messagingSenderId: "127037143111",
  appId: "1:127037143111:web:64b116c46a533f4b37d962",
  measurementId: "G-000HGZ12LR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;