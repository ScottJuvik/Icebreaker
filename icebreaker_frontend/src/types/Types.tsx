import { Timestamp } from "@firebase/firestore";

export type User = {
  id: number;
  name: string;
  email: string;
  favorites: Activity[];
  queues: Queue[];
  type: string;
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  creator: {
    id: string;
    name: string;
  };
  rating: number;
  category: {
    name: string;
    color: string;
  };
  dateCreated: Timestamp;
};

export type Queue = {
  id: string;
  title: string;
  activities: Activity[];
  dateCreated: Timestamp;
};

export type Review = {
  id: string;
  title: string;
  creator: {
    id: string;
    name: string;
  };
  dateCreated: Timestamp;
  description: string;
  rating: number;
};
