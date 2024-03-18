import { arrayRemove, arrayUnion, doc, updateDoc } from "@firebase/firestore";
import { getUserData } from "./UserAPI";
import { db } from "../firebase/firebaseConfig";

const getFavorite = async (activityId: string): Promise<boolean> => {
  const userId = sessionStorage.getItem("user_id");
  console.log(userId);
  if (!userId) return false;

  const userData = await getUserData(userId);
  return userData.favoriteIds.includes(activityId);
};

const updateFavorite = async (
  activityId: string,
  value: boolean
): Promise<void> => {
  const userId = sessionStorage.getItem("user_id");
  if (!userId) return;

  const userRef = doc(db, "users", userId);
  if (value) {
    await updateDoc(userRef, {
      favoriteIds: arrayUnion(activityId),
    });
  } else {
    await updateDoc(userRef, {
      favoriteIds: arrayRemove(activityId),
    });
  }
};

export { getFavorite, updateFavorite };
