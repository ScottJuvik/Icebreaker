import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar/Navbar";
import "../style/Login.css";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  const createUser = async (name: string, email: string) => {
    const docRef = await addDoc(collection(db, "users"), {
      name: name,
      email: email,
      favorites: [],
      type: "user"
    });
    setToken(docRef.id);
  };

  const handleGoogle = async () => {
    const provider = await new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result: any) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", result.user.email));

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          createUser(result.user.displayName, result.user.email);
        } else {
          setToken(querySnapshot.docs[0].id);
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  useEffect(() => {
    if (token !== "") {
      sessionStorage.setItem("user_id", token);
      console.log("This is the token: " + sessionStorage.getItem("user_id"));
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <>
      <Navbar atLoginPage />
      <div className={"inputContainer"}>
        <div onClick={() => handleGoogle()} className="button">
          <FcGoogle className="googleIcon" />
          <p>Sign in with Google</p>
        </div>
      </div>
    </>
  );
};

export default Login;
