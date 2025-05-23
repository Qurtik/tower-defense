import axios from 'axios'
import { IUserData } from '@/entities/User/types'

const API_URL = '/forum/comments'

export interface IComment {
  id: number
  content: string
  topicId: number
  userId: number
  user: IUserData
  createdAt: string
  updatedAt: string
  editable?: boolean
}

export const getCommentsByTopicId = async (
  topicId: number,
  userId: number
): Promise<IComment[]> => {
  const { data } = await axios.get(`${API_URL}/${topicId}`, {
    data: { userId },
  })
  return data
}

export const addComment = async (
  topicId: number,
  content: string,
  userId: number
): Promise<IComment> => {
  const { data } = await axios.post(`${API_URL}/${topicId}`, {
    content,
    userId,
  })
  return data
}

export const updateComment = async (
  id: number,
  content: string,
  userId: number
): Promise<IComment> => {
  const { data } = await axios.patch(`${API_URL}/${id}`, { content, userId })
  return data
}

export const deleteComment = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`)
}
