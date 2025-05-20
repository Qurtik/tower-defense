import { Topic } from '../model'

export class TopicService {
  static async createTopic(title: string, content: string) {
    return Topic.create({ title, content })
  }

  static async getAllTopics() {
    return Topic.findAll()
  }

  static async getTopicById(id: number) {
    return Topic.findByPk(id, { include: ['comments'] })
  }

  static async deleteTopic(id: number) {
    const topic = await Topic.findByPk(id)

    if (!topic) {
      throw new Error('Топик не найден')
    }

    await topic.destroy()

    return { message: 'Топик успешно удален' }
  }
}
