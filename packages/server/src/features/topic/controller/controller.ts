import { Request, Response } from 'express'
import { TopicService } from '../service/service'
import { withAuthController } from '../../../shared/lib/withAuthController'

export class TopicController {
  static createTopic = withAuthController(
    async (req: Request, res: Response, userId: number) => {
      try {
        const { title, content } = req.body

        if (!title.trim()) {
          res
            .status(400)
            .json({ error: 'Название топика обязательно для заполнения!' })
        }

        if (!content.trim()) {
          res
            .status(400)
            .json({ error: 'Содержимое топика обязательно для заполнения!' })
        }

        const topic = await TopicService.createTopic(
          title,
          content,
          Number(userId)
        )
        res.status(201).json(topic)
      } catch (error) {
        res.status(500).json({ error: 'Ошибка создания топика' })
      }
    }
  )

  static getAllTopics = withAuthController(
    async (_req: Request, res: Response, userId: number) => {
      try {
        const topics = await TopicService.getAllTopics(Number(userId))
        return res.json(topics)
      } catch (error) {
        return res.status(500).json({ error: 'Ошибка получения топиков' })
      }
    }
  )

  static getTopicById = withAuthController(
    async (req: Request, res: Response, userId: number): Promise<Response> => {
      try {
        const topic = await TopicService.getTopicById(
          Number(req.params.id),
          Number(userId)
        )

        return res.json(topic)
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes('не существует')) {
            return res.status(404).json({ error: error.message })
          }
        }
        return res.status(500).json({ error: 'Ошибка получения топиков' })
      }
    }
  )

  static deleteTopic = withAuthController(
    async (req: Request, res: Response, userId: number): Promise<Response> => {
      try {
        const result = await TopicService.deleteTopic(
          Number(req.params.id),
          Number(userId)
        )
        return res.status(200).json(result)
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'Топик не найден') {
            return res.status(404).json({ error: error.message })
          }
          return res.status(500).json({ error: 'Ошибка удаления топика' })
        }
        return res.status(500).json({ error: 'Неизвестная ошибка' })
      }
    }
  )

  static updateTopic = withAuthController(
    async (req: Request, res: Response, userId: number) => {
      try {
        const { id } = req.params
        const { title, content } = req.body

        const updatedTopic = await TopicService.updateTopic(
          Number(id),
          Number(userId),
          {
            title,
            content,
          }
        )

        return res.status(200).json(updatedTopic)
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes('не найден')) {
            return res.status(403).json({ error: error.message })
          }
        }
        return res
          .status(500)
          .json({ error: 'Ошибка при редактировании топика' })
      }
    }
  )
}
