import { TopicModel } from '../model/model'

export class TopicService {
  static async createTopic(title: string, content: string) {
    return TopicModel.create({ title, content })
  }

  static async getAllTopics() {
    return TopicModel.findAll()
  }

  static async getTopicById(id: number) {
    return TopicModel.findByPk(id, { include: ['comments'] })
  }

  static async deleteTopic(id: number) {
    const topic = await TopicModel.findByPk(id)

    if (!topic) {
      throw new Error('Топик не найден')
    }

    await topic.destroy()

    return { message: 'Топик успешно удален' }
  }
}
