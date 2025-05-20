import { Request, Response } from 'express'
import { TopicService } from '../service'

export class TopicController {
  static async createTopic(req: Request, res: Response) {
    try {
      const { title, content } = req.body
      const topic = await TopicService.createTopic(title, content)
      res.status(201).json(topic)
    } catch (error) {
      res.status(500).json({ error: 'Ошибка создания топика' })
    }
  }

  static async getAllTopics(req: Request, res: Response) {
    try {
      console.log(req)
      const topics = await TopicService.getAllTopics()
      res.json(topics)
    } catch (error) {
      res.status(500).json({ error: 'Ошибка получения топиков' })
    }
  }

  static async getTopicById(req: Request, res: Response): Promise<Response> {
    try {
      const topic = await TopicService.getTopicById(Number(req.params.id))
      if (!topic) {
        return res.status(404).json({ error: 'Топики не найдены' })
      }
      return res.json(topic)
    } catch (error) {
      return res.status(500).json({ error: 'Ошибка получения топиков' })
    }
  }

  static async deleteTopic(req: Request, res: Response): Promise<Response> {
    try {
      const result = await TopicService.deleteTopic(Number(req.params.id))
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
}
