import axios from 'axios'
import { getBaseURL } from '../lib/utils/getBaseURL'

const httpService = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default httpService
