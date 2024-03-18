import { Timestamp } from "@firebase/firestore";

export type UserData = {
  id: string;
  name: string;
  email: string;
  favoriteIds: string[];
  queueIds: string[];
};

export type ActivityData = {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  categoryId: string;
  dateCreated: Timestamp;
};

export type CategoryData = {
  id: string;
  name: string;
};

export type QueueData = {
  id: string;
  title: string;
  activityIds: string[];
  dateCreated: Timestamp;
};

export type ReviewData = {
  id: string;
  activityId: string;
  title: string;
  creatorId: string;
  dateCreated: Timestamp;
  description: string;
  rating: number;
};
