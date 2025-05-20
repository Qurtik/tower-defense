import { Request, Response } from 'express'
import { CommentService } from '../service'

export class CommentController {
  static async create(req: Request, res: Response) {
    try {
      const { content } = req.body
      const { topicId } = req.params
      const comment = await CommentService.create(content, Number(topicId))
      res.status(201).json(comment)
    } catch (error) {
      res.status(500).json({ error: 'Ошибка создания комментария' })
    }
  }

  static async getByTopicId(req: Request, res: Response) {
    try {
      const comments = await CommentService.getByTopicId(
        Number(req.params.topicId)
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
}
