import { Request, Response } from 'express'
import { CommentService } from '../service/service'

export class CommentController {
  static async create(req: Request, res: Response) {
    try {
      const { content, userId } = req.body
      const { topicId } = req.params
      const comment = await CommentService.create(
        content,
        Number(topicId),
        userId
      )
      res.status(201).json(comment)
    } catch (error) {
      res.status(500).json({ error: 'Ошибка создания комментария' })
    }
  }

  static async getByTopicId(req: Request, res: Response) {
    try {
      const { userId } = req.body

      const comments = await CommentService.getByTopicId(
        Number(req.params.topicId),
        Number(userId)
      )
      res.json(comments)
    } catch (error) {
      res.status(500).json({ error: 'Ошибка получения списка комментариев' })
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await CommentService.delete(Number(req.params.id))
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ error: 'Ошибка удаления комментария' })
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { userId, content } = req.body
      const { commentId } = req.params

      const updateComment = await CommentService.updateComment(
        Number(commentId),
        Number(userId),
        content
      )

      return res.status(200).json(updateComment)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('не найден')) {
          return res.status(403).json({ error: error.message })
        }
      }

      return res
        .status(500)
        .json({ error: 'Ошибка редактирования комментария' })
    }
  }
}
