import { Request, Response } from 'express'
import { CommentService } from '../service/service'
import { withAuthController } from '../../../shared/lib/withAuthController'

export class CommentController {
  static create = withAuthController(
    async (req: Request, res: Response, userId: number) => {
      try {
        const { content } = req.body
        const { topicId } = req.params

        if (!content.trim()) {
          return res
            .status(400)
            .json({ error: 'Текст в комментарии обязателен!' })
        }

        const comment = await CommentService.create(
          content,
          Number(topicId),
          userId
        )
        return res.status(201).json(comment)
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes('не найден')) {
            return res.status(404).json({ message: error.message })
          }
          return res.status(400).json({ error: error.message })
        } else {
          return res.status(500).json({ error: 'Ошибка создания комментария' })
        }
      }
    }
  )

  static getByTopicId = withAuthController(
    async (req: Request, res: Response, userId: number) => {
      try {
        const { topicId } = req.params
        const comments = await CommentService.getByTopicId(
          Number(topicId),
          Number(userId)
        )
        return res.json(comments)
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ error: error.message })
        } else {
          return res
            .status(500)
            .json({ error: 'Ошибка получения списка комментариев' })
        }
      }
    }
  )

  static delete = withAuthController(async (req: Request, res: Response) => {
    try {
      const { topicId } = req.params
      await CommentService.delete(Number(topicId))
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ error: 'Ошибка удаления комментария' })
    }
  })

  static update = withAuthController(
    async (req: Request, res: Response, userId: number) => {
      try {
        const { content } = req.body
        const { topicId } = req.params

        const updateComment = await CommentService.updateComment(
          Number(topicId),
          Number(userId),
          content
        )

        return res.status(200).json(updateComment)
      } catch (error) {
        if (error instanceof Error) {
          return res.status(403).json({ error: error.message })
        }

        return res
          .status(500)
          .json({ error: 'Ошибка редактирования комментария' })
      }
    }
  )
}
