export type User = {
  id: number
  name: string
  email: string 
  favorite_ids: string[]
  queue_ids: string[]
}

export type Activity = {
  id: string
  title: string
  description: string
  creator_id: string
  averageRating: number
  categories: Category[]
}

export type Category = {
  id: number
  name: string
}

export type Queue = {
  id: string
  title: string
  activity_ids: string[]
}