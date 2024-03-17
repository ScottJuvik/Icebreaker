import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Activity, Category } from "../types/types";
import { useState } from "react";

const getActivities = async (): Promise<Activity[]> => {
  const querySnapshot = await getDocs(collection(db, "activities"));
  const activities: Activity[] = [];
  querySnapshot.forEach((doc) => {
    activities.push(dataToActivity(doc));
  });
  return activities;
};

const getActivitiesWithIds = async (ids: string[]): Promise<Activity[]> => {
  const querySnapshot = await getDocs(collection(db, "activities"));
  const activities: Activity[] = [];
  querySnapshot.forEach((doc) => {
    if (ids.includes(doc.id)) {
      activities.push(dataToActivity(doc));
    }
  });
  return activities;
};

const dataToActivity = (doc: any): Activity => {
  const data: Activity = {
    ...(doc.data() as Activity),
    id: doc.id,
    title: doc.data().title,
    description: doc.data().description,
    creator: doc.data().creator.name,
    averageRating: doc.data().averageRating,
  };
  return data;
};

const addActivity = async (activity: Activity) => {
  const docRef = collection(db, "activities");
  await addDoc(docRef, activity);
};

export { getActivities, getActivitiesWithIds };
