import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/Searchbar/SearchBar";
import Activities from "../components/Activities/Activities";
import QueueCard from "../components/QueueCard/QueueCard";
import { Activity } from "../types/Types";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Queue } from "../types/Types";
import "../style/QueueStyles.css";
import CloseIcon from "../components/icons/CloseIcon";
import { getLoggedIn, getLoggedInId } from "../api/LoggedInAPI";
import { useNavigate } from "react-router";
import { QueueData } from "../types/DatabaseTypes";
import { getFavoriteQueueData, getQueueDatas } from "../api/QueuesAPI";
import FabButton from "../components/FabButton/FabButton";

const MyPage = () => {
  const navigate = useNavigate();

  const [queues, setQueues] = useState<QueueData[]>([]);

  useEffect(() => {
    if (!getLoggedIn()) navigate("/login");

    getFavoriteQueueData(getLoggedInId()).then((favoriteQueue) => {
      getQueueDatas(getLoggedInId()).then((queues) => {
        setQueues([favoriteQueue, ...queues]);
      });
    });
  }, []);

  const navigateToCreateQueue = () => {
    navigate("/create_queue");
  };

  return (
    <>
      <Navbar atMyPage={true} />
      <div className="content_container">
        <h2>My page</h2>
        {
          <li className="activities">
            <ul>
              {queues.map((queue: QueueData) => (
                <div className="queue-div">
                  <QueueCard key={queue.id} {...queue} />
                  <button>
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </ul>
          </li>
        }
      </div>
      <div className="fab">
        <FabButton icon="add" handleClick={navigateToCreateQueue} />
      </div>
    </>
  );
};

export default MyPage;
