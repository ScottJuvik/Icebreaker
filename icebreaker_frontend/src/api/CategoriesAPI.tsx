import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useState } from "react";
import { User } from "../types/Types";
import { CategoryData } from "../types/DatabaseTypes";

const getCategories = async (): Promise<CategoryData[]> => {
  const categories: CategoryData[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    querySnapshot.forEach((doc) => {
      categories.push(dataToCategory(doc));
    });
  } catch (e) {
    console.error("Error getting categories: ", e);
  }
  return categories;
};

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

export { getCategory, getCategories };
