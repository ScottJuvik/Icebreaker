import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar";
import Activities from "../components/Activities";
import ActivityCard from "../components/ActivityCard";
import { Activity } from "../types/types";
import { getActivities } from "../api/ActivitiesAPI";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../style/QueueStyles.css";

const QueuePage = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    setLoggedIn(
      sessionStorage.getItem("user_id") !== "" &&
        sessionStorage.getItem("user_id") !== null
    );
  }, []);

  const [activities, setActivities] = useState<Activity[]>([]); // State variable for activities
  const getActivities = async () => {
    const querySnapshot = await getDocs(collection(db, "activities"));
    const activityList: Activity[] = [];
    console.log(
      querySnapshot.forEach((doc) => {
        const data: Activity = {
          ...(doc.data() as Activity),
          id: doc.id,
        };
        activityList.push(data);
      })
    );
    setActivities(activityList);
    console.log(activityList);
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <>
      <Navbar />
      <div className="content_container">
        <h2>Queues</h2>
        {!isLoggedIn && <p>You need to be logged in to view this page</p>}
        {isLoggedIn && <Activities activities={activities} />}
      </div>
    </>
  );
};

export default QueuePage;
