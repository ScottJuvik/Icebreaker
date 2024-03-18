// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore, } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEogkdVwB5WBv-kDq-Ij8zu0j84wIkHs8",
  authDomain: "icebreaker-turbo.firebaseapp.com",
  projectId: "icebreaker-turbo",
  storageBucket: "icebreaker-turbo.appspot.com",
  messagingSenderId: "53075913839",
  appId: "1:53075913839:web:c5bbc901653a8ba86e719a",
  measurementId: "G-8QERLNHLNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

