import httpService from '@/shared/api/httpService'
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
  topicId: number
): Promise<IComment[]> => {
  const { data } = await httpService.get(`${API_URL}/${topicId}`)
  return data
}

export const addComment = async (
  topicId: number,
  content: string
): Promise<IComment> => {
  const { data } = await httpService.post(`${API_URL}/${topicId}`, {
    content,
  })
  return data
}

export const updateComment = async (
  id: number,
  content: string
): Promise<IComment> => {
  const { data } = await httpService.patch(`${API_URL}/${id}`, {
    content,
  })
  return data
}

export const deleteComment = async (id: number) => {
  await httpService.delete(`${API_URL}/${id}`)
}
