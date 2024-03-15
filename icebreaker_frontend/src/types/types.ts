import { Timestamp } from "@firebase/firestore"

export type User = {
  id: string
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
  categories: Category[]
}

export type Category = {
  id: number
  name: string
}

export type Review = {
  id: string;
  activityId: string;
  creator: {
    id: string;
    name: string
  }
  dateCreated: Timestamp;
  description: string;
  title: string;
}
