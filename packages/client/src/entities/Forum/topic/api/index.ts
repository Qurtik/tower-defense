import httpService from '@/shared/api/httpService'
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
  const { data } = await httpService.get(API_URL, {
    params: { userId },
  })
  return data
}

export const getTopicById = async (
  id: number,
  userId: number
): Promise<ITopic> => {
  const { data } = await httpService.get(`${API_URL}/${id}`, {
    params: { userId },
  })
  return data
}

export const createTopic = async (
  title: string,
  content: string,
  userId: number
): Promise<ITopic> => {
  const { data } = await httpService.post(API_URL, { title, content, userId })
  return data
}

export const updateTopic = async (
  id: number,
  title: string,
  content: string,
  userId: number
): Promise<ITopic> => {
  const { data } = await httpService.patch(`${API_URL}/${id}`, {
    title,
    content,
    userId,
  })
  return data
}

export const deleteTopic = async (id: number, userId: number) => {
  await httpService.delete(`${API_URL}/${id}`, { data: { userId } })
}
