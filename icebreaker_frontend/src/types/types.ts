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
  categories: string[]
}