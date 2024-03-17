import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Activity, Category, Queue } from "../types/types";
import { useState } from "react";

//make a function to load activities from the database and return them
//this function will take a callback function as a parameter

const getQueues = async (): Promise<Queue[]> => {
  const querySnapshot = await getDocs(collection(db, "queues"));
  const queues: Queue[] = [];
  querySnapshot.forEach((doc) => {
    queues.push(dataToQueue(doc));
  });
  return queues;
};

const getQueue = async (id: string): Promise<Queue> => {
  const docRef = doc(db, "queues", id);
  const docSnap = await getDoc(docRef);
  return dataToQueue(docSnap);
};

const dataToQueue = (doc: any): Queue => {
  const data: Queue = {
    ...(doc.data() as Queue),
    id: doc.id,
    title: doc.data().title,
    activity_ids: doc.data().activities.map((activity: any) => activity.id),
  };
  return data;
};

export { getQueues, getQueue };
