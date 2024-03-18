import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useState } from "react";
import { Activity, Queue } from "../types/Types";
import { QueueData } from "../types/DatabaseTypes";
import { addQueueId, getUserData } from "./UserAPI";
import { getLoggedInId } from "./LoggedInAPI";
import { getActivitiesWithIds, getActivityDatasWithIds } from "./ActivitiesAPI";

//make a function to load activities from the database and return them
//this function will take a callback function as a parameter

const getFavoriteQueueData = async (userId: string): Promise<QueueData> => {
  const user = await getUserData(userId);
  const favoriteQueue: QueueData = {
    id: "",
    title: "My Favorites",
    activityIds: user.favoriteIds,
    dateCreated: Timestamp.now(),
  };
  return favoriteQueue;
};

const getQueueDatas = async (userId: string): Promise<QueueData[]> => {
  const user = await getUserData(userId);
  const querySnapshot = await getDocs(collection(db, "queues"));
  const queues: QueueData[] = [];
  querySnapshot.forEach((doc) => {
    if (user.queueIds.includes(doc.id)) queues.push(dataToQueueData(doc));
  });
  return queues;
};

const getQueueData = async (id: string): Promise<QueueData> => {
  const docRef = doc(db, "queues", id);
  const docSnap = await getDoc(docRef);
  return dataToQueueData(docSnap);
};

const getQueue = async (id: string): Promise<Queue> => {
  if (id === "") {
    const queueData = await getFavoriteQueueData(getLoggedInId());
    if (queueData === undefined)
      return {
        id: "",
        title: "",
        activities: [],
        dateCreated: Timestamp.now(),
      };

    const activities = await getActivitiesWithIds(queueData.activityIds);

    return queueDataToQueue(queueData, activities);
  } else {
    const queueData = await getQueueData(id);
    if (queueData === undefined)
      return {
        id: "",
        title: "",
        activities: [],
        dateCreated: Timestamp.now(),
      };

    const activities = await getActivitiesWithIds(queueData.activityIds);

    return queueDataToQueue(queueData, activities);
  }
};

const dataToQueueData = (doc: any): QueueData => {
  const data: QueueData = {
    ...(doc.data() as QueueData),
    id: doc.id,
    title: doc.data().title,
    activityIds: (doc.data().activityIds || []).map(
      (activity: any) => activity.id
    ),
    dateCreated: doc.data().dateCreated,
  };
  return data;
};

const queueDataToQueue = (
  queueData: QueueData,
  activities: Activity[]
): Queue => {
  const queue: Queue = {
    id: queueData.id || "",
    title: queueData.title || "",
    activities: activities || [],
    dateCreated: queueData.dateCreated || Timestamp.now(),
  };
  return queue;
};

//return an id of the new queue
const addQueue = async (queue: QueueData): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "queues"), queue);
    return docRef.id; // Return the ID of the newly added document
  } catch (error) {
    console.error("Error adding queue:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export {
  getQueueDatas,
  getQueueData,
  addQueue,
  getFavoriteQueueData,
  getQueue,
};
