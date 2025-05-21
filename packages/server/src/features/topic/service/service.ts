import { TopicModel } from '../model/model'

export class TopicService {
  static async createTopic(title: string, content: string, userId: number) {
    return TopicModel.create({ title, content, userId })
  }

  static async getAllTopics() {
    return TopicModel.findAll({ include: ['user'] })
  }

  static async getTopicById(id: number) {
    return TopicModel.findByPk(id, { include: ['comments', 'user'] })
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
