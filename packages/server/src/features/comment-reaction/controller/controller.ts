import { Request, Response } from 'express'
import { CommentReactionService } from '../service/service'
import { withAuthController } from '../../../shared/lib/withAuthController'

export class CommentReactionController {
  static create = withAuthController(async (req: Request, res: Response) => {
    try {
      const idComment = Number(req.params.idComment)
      const { emoji, authorId } = req.body

      const comment = await CommentReactionService.create(
        emoji,
        idComment,
        Number(authorId)
      )

      return res.status(201).json(comment)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      } else {
        return res.status(500).json({ error: 'Ошибка при сохранении эмодзи' })
      }
    }
  })

  static getReactionsByIdComment = withAuthController(
    async (req: Request, res: Response) => {
      try {
        const { idComment } = req.params

        const reactions = await CommentReactionService.getReactionsByIdComment(
          Number(idComment)
        )
        res.json(reactions)
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ error: error.message })
        } else {
          res.status(500).json({ error: 'Ошибка получения списка реакций' })
        }
      }
    }
  )

  static delete = withAuthController(async (req: Request, res: Response) => {
    const idComment = Number(req.params.idComment)
    const { emoji, authorId } = req.body

    try {
      const result = await CommentReactionService.delete(
        emoji,
        idComment,
        authorId
      )
      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({ error: 'Ошибка удаления комментария' })
    }
  })
}
