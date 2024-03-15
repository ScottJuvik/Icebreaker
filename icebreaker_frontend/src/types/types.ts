import { Timestamp } from "@firebase/firestore"

export type User = {
  id: number
  name: string
  userName: string
  password: string
}

export type Activity = {
  id: string
  title: string
  description: string
  creator: User
  averageRating: number
  category: string
}

export type Category = {
  id: number
  name: string
}

export type Review = {
  activityId: string;
  creator: {
    id: string;
    name: string
  }
  dateCreated: Timestamp;
  description: string;
  title: string;
}