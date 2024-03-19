import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/Searchbar/SearchBar";
import Activities from "../components/Activities/Activities";
import ActivityCard from "../components/Activities/ActivityCard";
import { Activity } from "../types/Types";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <div className="content_container">
        <h2>404 Page not found</h2>
      </div>
    </>
  );
};

export default NotFoundPage;
