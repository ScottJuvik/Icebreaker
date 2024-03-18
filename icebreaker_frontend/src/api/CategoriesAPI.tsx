import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useState } from "react";
import { User } from "../types/Types";
import { CategoryData } from "../types/DatabaseTypes";

const getCategory = async (id: string): Promise<CategoryData> => {
  try {
    const docRef = doc(db, "categories", id);
    const docSnap = await getDoc(docRef);
    return dataToCategory(docSnap);
  } catch (e) {
    console.error("Error getting category: ", e);
  }
  return {
    id: id,
    name: "",
  };
};

const dataToCategory = (doc: any): CategoryData => {
  const data: CategoryData = {
    ...(doc.data() as CategoryData),
    id: doc.id,
    name: doc.data().name || "",
  };
  return data;
};

export { getCategory };
