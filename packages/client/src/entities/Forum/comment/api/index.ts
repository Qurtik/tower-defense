import httpService from '@/shared/api/httpService'
import { IUserData } from '@/entities/User/types'
import { EmojiResponse } from '@/entities/Forum/comment/ui/EmojiSection/types'

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

export const getEmojiByCommentId = async (
  commentId: number
): Promise<EmojiResponse[]> => {
  const { data } = await httpService.get(`${API_URL}/${commentId}/reactions`)
  return data
}

export const addEmoji = async (
  emoji: string,
  idComment: number,
  authorId: number
) => {
  console.log('emoji', emoji)
  console.log('idComment', idComment)
  console.log('authorId', authorId)

  const { data } = await httpService.post(`${API_URL}/${idComment}/reactions`, {
    emoji,
    //  idComment,
    authorId,
  })
  return data
}

export const deleteEmoji = async (
  emoji: string,
  idComment: number,
  authorId: number
) => {
  console.log('idComment', idComment)

  const { data } = await httpService.delete(
    `${API_URL}/${idComment}/reactions`,
    {
      data: {
        emoji,
        authorId,
      },
    }
  )
  return data
}
