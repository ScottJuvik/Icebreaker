import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar";
import Activities from "../components/Activities";
import QueueCard from "../components/QueueCard";
import { Activity } from "../types/types";
import { getActivities } from "../api/ActivitiesAPI";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Queue } from "../types/types";
import "../style/QueueStyles.css";
import CloseIcon from "../components/icons/CloseIcon";

const QueuesPage = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    setLoggedIn(
      sessionStorage.getItem("user_id") !== "" &&
        sessionStorage.getItem("user_id") !== null
    );
  }, []);

  const [queues, setQueues] = useState<Queue[]>([]);

  //get svg from src/icons/close.svg
  return (
    <>
      <Navbar />
      <div className="content_container">
        <h2>Queues</h2>
        {!isLoggedIn && <p>You need to be logged in to view this page</p>}
        {isLoggedIn && (
          <li className="activities">
            <ul>
              {queues.map((queue: Queue) => (
                <div className="queue-div">
                  <QueueCard key={queue.id} {...queue} />
                  <button>
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </ul>
          </li>
        )}
      </div>
    </>
  );
};

export default QueuesPage;
