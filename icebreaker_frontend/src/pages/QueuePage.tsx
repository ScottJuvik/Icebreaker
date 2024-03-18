import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar";
import Activities from "../components/Activities";
import ActivityCard from "../components/ActivityCard";
import { Activity, Queue } from "../types/Types";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../style/QueueStyles.css";
import { useNavigate, useParams } from "react-router-dom";
import { getLoggedIn, getLoggedInId } from "../api/LoggedInAPI";
import { getQueue, getQueueData, getQueueDatas } from "../api/QueuesAPI";
import FabButton from "../components/FabButton/FabButton";

const QueuePage = () => {
  const navigate = useNavigate();
  const { queueId } = useParams();
  const [queue, setQueue] = useState<Queue>();
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!getLoggedIn()) navigate("/login");
    console.log("queueId: ", queueId);
    getQueue(queueId || "").then((queue) => {
      setQueue(queue);
      setIsEmpty(queue.activities.length === 0);
    });
  }, []);
  // useEffect(() => {
  //   if (queueId)
  //     getQueue(queueId).then((queue) => {
  //       setQueue(queue);
  //     });
  // }, [queueId]);

  const navigateToPlay = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="content_container">
        {queue && <h2>{queue.title}</h2>}
        {queue?.activities && <Activities activities={queue.activities} />}
        {isEmpty && <p>Queue is empty</p>}
      </div>
      {!isEmpty && <FabButton icon="play" handleClick={navigateToPlay} />}
    </>
  );
};

export default QueuePage;
