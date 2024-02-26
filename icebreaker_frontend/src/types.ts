export type User = {
  id: number
  name: string
  userName:string
  password: string
}

export type Activity = {
  id: number
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