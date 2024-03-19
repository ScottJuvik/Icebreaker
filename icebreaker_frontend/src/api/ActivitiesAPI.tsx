import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Activity } from "../types/Types";
import { ActivityData, CategoryData, UserData } from "../types/DatabaseTypes";
import { getUserData } from "./UserAPI";
import { getAverageRating } from "./ReviewAPI";
import { getCategory } from "./CategoriesAPI";

const getActivityDatas = async (): Promise<ActivityData[]> => {
  const querySnapshot = await getDocs(collection(db, "activities"));
  const activities: ActivityData[] = [];
  querySnapshot.forEach((doc) => {
    activities.push(dataToActivityData(doc));
  });
  return activities;
};

const getActivityDatasWithIds = async (
  ids: string[]
): Promise<ActivityData[]> => {
  const querySnapshot = await getDocs(collection(db, "activities"));
  const activities: ActivityData[] = [];
  querySnapshot.forEach((doc) => {
    if (ids.includes(doc.id)) {
      activities.push(dataToActivityData(doc));
    }
  });
  return activities;
};

const getActivitiesWithIds = async (ids: string[]): Promise<Activity[]> => {
  const activityDatas = await getActivityDatasWithIds(ids);
  const activities = await Promise.all(
    activityDatas.map(async (activityData) => {
      const creator = await getUserData(activityData.creatorId);
      const rating = await getAverageRating(activityData.id);
      const category = await getCategory(activityData.categoryId);
      return dataToActivity(activityData, creator, rating, category);
    })
  );

  return activities;
};

const getActivities = async (): Promise<Activity[]> => {
  const activityDatas = await getActivityDatas();
  const activities = await Promise.all(
    activityDatas.map(async (activityData) => {
      const creator = await getUserData(activityData.creatorId);
      const rating = await getAverageRating(activityData.id);
      const category = await getCategory(activityData.categoryId);
      return dataToActivity(activityData, creator, rating, category);
    })
  );

  return activities;
};

const dataToActivityData = (doc: any): ActivityData => {
  const data: ActivityData = {
    ...(doc.data() as ActivityData),
    id: doc.id,
    title: doc.data().title || "",
    description: doc.data().description || "",
    creatorId: doc.data().creatorId || "",
    dateCreated: doc.data().dateCreated || "",
  };
  return data;
};

const dataToActivity = (
  activityData: ActivityData,
  creator: UserData,
  rating: number,
  category: CategoryData
): Activity => {
  const data: Activity = {
    id: activityData.id,
    title: activityData.title,
    description: activityData.description,
    creator: {
      id: creator.id,
      name: creator.name,
    },
    rating: rating,
    category: {
      name: category.name,
      color: category.color,
    },
    dateCreated: activityData.dateCreated,
  };
  return data;
};

const getActivityData = async (id: string): Promise<ActivityData> => {
  try {
    const docRef = doc(db, "activities", id);
    const docSnap = await getDoc(docRef);
    return dataToActivityData(docSnap);
  } catch (e) {
    console.error("Error getting activity data: ", e);
  }
  return {
    id: "",
    title: "",
    description: "",
    creatorId: "",
    categoryId: "",
    dateCreated: Timestamp.now(),
  };
};

const getActivity = async (id: string): Promise<Activity> => {
  const activityData = await getActivityData(id);
  const creator = await getUserData(activityData.creatorId);
  const rating = await getAverageRating(id);
  const category = await getCategory(activityData.categoryId);
  return dataToActivity(activityData, creator, rating, category);
};

const addActivity = async (activity: ActivityData) => {
  const docRef = collection(db, "activities");
  await addDoc(docRef, activity);
};

const deleteActivity = async (id: string) => {
  const docRef = doc(db, "activities", id);
  await deleteDoc(docRef);
};

export {
  getActivityDatas,
  getActivityDatasWithIds,
  addActivity,
  getActivities,
  getActivity,
  getActivityData,
  getActivitiesWithIds,
  deleteActivity,
};
