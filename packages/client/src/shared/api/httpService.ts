import axios from 'axios'

const httpService = axios.create({
  baseURL:
    process.env.API_PRACTICUM_URL || import.meta.env.VITE_API_PRACTICUM_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default httpService
