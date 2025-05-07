import axios from 'axios'

const isServer = typeof window === 'undefined'

const baseURL = isServer
  ? process.env.API_PRACTICUM_URL
  : import.meta.env.VITE_API_PRACTICUM_URL

const httpService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default httpService
