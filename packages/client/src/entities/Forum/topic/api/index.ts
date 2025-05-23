import axios from 'axios'
import { IUserData } from '@/entities/User/types'

const API_URL = '/forum/topics'

export interface ITopic {
  id: number
  title: string
  content: string
  userId: number
  user: IUserData
  createdAt: string
  updatedAt: string
  editable?: boolean
}

export const getTopics = async (userId: number): Promise<ITopic[]> => {
  const { data } = await axios.get(API_URL, { data: { userId } })
  return data
}

export const getTopicById = async (
  id: number,
  userId: number
): Promise<ITopic> => {
  const { data } = await axios.get(`${API_URL}/${id}`, { data: { userId } })
  return data
}

export const createTopic = async (
  title: string,
  content: string,
  userId: number
): Promise<ITopic> => {
  const { data } = await axios.post(API_URL, { title, content, userId })
  return data
}

export const updateTopic = async (
  id: number,
  title: string,
  content: string,
  userId: number
): Promise<ITopic> => {
  const { data } = await axios.patch(`${API_URL}/${id}`, {
    title,
    content,
    userId,
  })
  return data
}

export const deleteTopic = async (id: number, userId: number) => {
  await axios.delete(`${API_URL}/${id}`, { data: { userId } })
}
