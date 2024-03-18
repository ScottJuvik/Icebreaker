import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useState } from "react";
import { User } from "../types/Types";
import { UserData } from "../types/DatabaseTypes";

const getUserData = async (id: string): Promise<UserData> => {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    return dataToUserData(docSnap);
  } catch (e) {
    console.error("Error getting user data: ", e);
  }
  return {
    id: "",
    name: "",
    email: "",
    favoriteIds: [],
    queueIds: [],
  };
};

const dataToUserData = (doc: any): UserData => {
  const data: UserData = {
    ...(doc.data() as UserData),
    id: doc.id,
    name: doc.data().name || "",
    email: doc.data().email || "",
    favoriteIds: doc.data().favoriteIds || [],
    queueIds: doc.data().queueIds || [],
  };
  return data;
};

const addQueueId = async (userId: string, queueId: string) => {
  const user = await getUserData(userId);
  user.queueIds.push(queueId);
  const docRef = doc(db, "users", userId); // Use the doc function instead of collection
  await setDoc(docRef, user); // Use the setDoc function to update the user data
};

export { getUserData, addQueueId };
