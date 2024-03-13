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

const QueuesPage = () => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    setLoggedIn(
      sessionStorage.getItem("user_id") !== "" &&
        sessionStorage.getItem("user_id") !== null
    );
  }, []);

  const [queues, setQueues] = useState<Queue[]>([
    {
      id: "1",
      title: "My Queue",
      activities: [
        {
          id: "1",
          title: "Activity 1",
          description: "Description 1",
          creator: {
            id: 1,
            name: "Creator 1",
            userName: "creator1",
            password: "password1",
          },
          averageRating: 3,
          categories: [
            {
              id: 1,
              name: "Category 1",
            },
          ],
        },
      ],
    },
    {
      id: "2",
      title: "My Queue 2",
      activities: [
        {
          id: "2",
          title: "Activity 2",
          description: "Description 2",
          creator: {
            id: 2,
            name: "Creator 2",
            userName: "creator2",
            password: "password2",
          },
          averageRating: 4,
          categories: [
            {
              id: 2,
              name: "Category 2",
            },
          ],
        },
      ],
    },
    {
      id: "3",
      title: "My Queue 3",
      activities: [
        {
          id: "3",
          title: "Activity 3",
          description: "Description 3",
          creator: {
            id: 3,
            name: "Creator 3",
            userName: "creator3",
            password: "password3",
          },
          averageRating: 5,
          categories: [
            {
              id: 3,
              name: "Category 3",
            },
          ],
        },
      ],
    },
  ]);

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
                <QueueCard key={queue.id} {...queue} />
              ))}
            </ul>
          </li>
        )}
      </div>
    </>
  );
};

export default QueuesPage;
