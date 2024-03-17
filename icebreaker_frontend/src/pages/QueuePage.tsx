import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar";
import Activities from "../components/Activities";
import ActivityCard from "../components/ActivityCard";
import { Activity, Queue } from "../types/types";
import { getActivities } from "../api/ActivitiesAPI";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../style/QueueStyles.css";
import { useParams } from "react-router-dom";
import { getQueue } from "../api/QueuesAPI";

const QueuePage = () => {
  const { queueId } = useParams();

  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    console.log("user_id: ", sessionStorage.getItem("user_id"));
    setLoggedIn(
      sessionStorage.getItem("user_id") !== "" &&
        sessionStorage.getItem("user_id") !== null
    );
  }, []);

  const [queue, setQueue] = useState<Queue | undefined>();
  useEffect(() => {
    if (queueId)
      getQueue(queueId).then((queue) => {
        setQueue(queue);
      });
  }, [queueId]);

  return (
    <>
      <Navbar />
      <div className="content_container">
        <h2>Queues</h2>
        {!isLoggedIn && <p>You need to be logged in to view this page</p>}
        {/* {isLoggedIn && queue?.activities && (
          <Activities activities={queue.activities} />
        )} */}
      </div>
    </>
  );
};

export default QueuePage;
