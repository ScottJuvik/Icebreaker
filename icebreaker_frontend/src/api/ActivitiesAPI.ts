import { Activity, User } from '../types'

/**
 * Allows enviroment variables to change the url
 * Default: http://localhost:8000
 */

const port =8080// import.meta.env.VITE_SERVER_PORT || 8000
const baseURL = `http://localhost:${port}`
//   import.meta.env.VITE_CHE_LINK ||
//   `http://${import.meta.env.VITE_SERVER_IP || 'localhost'}:${port}`

export const getActivities = async (): Promise<Activity[]> => {
  return fetch(`${baseURL}/activities`, { method: 'GET' })
    .then((res) => res.json())
    .catch((e) => console.log(e))
}
