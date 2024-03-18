import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useState } from "react";
import { Review, User } from "../types/Types";
import { ReviewData, UserData } from "../types/DatabaseTypes";
import { getUserData } from "./UserAPI";

const getReviewDatas = async (activityId: string): Promise<ReviewData[]> => {
  const querySnapshot = await getDocs(collection(db, "reviews"));
  const reviews: ReviewData[] = [];
  querySnapshot.forEach((doc) => {
    if (doc.data().activityId === activityId)
      reviews.push(dataToReviewData(doc));
  });
  return reviews;
};

const getReviews = async (activityId: string): Promise<Review[]> => {
  const reviewDatas = await getReviewDatas(activityId);
  //for each reviewData, load userData and return an array of reviews
  const reviews = await Promise.all(
    reviewDatas.map(async (reviewData) => {
      const creator = await getUserData(reviewData.creatorId);
      return dataToReview(reviewData, creator);
    })
  );
  return reviews;
};

const getAverageRating = async (activityId: string): Promise<number> => {
  const reviews = await getReviewDatas(activityId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};

const dataToReviewData = (doc: any): ReviewData => {
  const data: ReviewData = {
    ...(doc.data() as ReviewData),
    id: doc.id,
    activityId: doc.data().activityId || "",
    creatorId: doc.data().creatorId || "",
    rating: doc.data().rating || 0,
  };
  return data;
};

const dataToReview = (reviewData: ReviewData, creator: UserData): Review => {
  const data: Review = {
    id: reviewData.id,
    creator: {
      id: creator.id,
      name: creator.name,
    },
    rating: reviewData.rating,
    title: reviewData.title,
    dateCreated: reviewData.dateCreated,
    description: reviewData.description,
  };
  return data;
};

const addReview = async (review: ReviewData) => {
  try {
    const docRef = await addDoc(collection(db, "reviews"), review);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding review: ", e);
  }
};

const deleteReview = async (reviewId: string) => {
  try {
    await deleteDoc(doc(db, "reviews", reviewId));
  } catch (e) {
    console.error("Error deleting review: ", e);
  }
};

export {
  getReviewDatas,
  getReviews,
  getAverageRating,
  addReview,
  deleteReview,
};
