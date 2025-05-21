import { TopicModel } from '../model/model'

export class TopicService {
  static async createTopic(title: string, content: string, userId: number) {
    return TopicModel.create({ title, content, userId })
  }

  static async getAllTopics(userId?: number) {
    const topics = await TopicModel.findAll()

    return topics.map(topic => ({
      ...topic.get({ plain: true }),
      editable: userId ? topic.userId === userId : false,
    }))
  }

  static async getTopicById(id: number) {
    return TopicModel.findByPk(id, { include: ['comments', 'user'] })
  }

  static async deleteTopic(topicId: number, userId: number) {
    const topic = await TopicModel.findOne({
      where: { id: topicId, userId: userId },
    })

    if (!topic) {
      throw new Error('Топик не найден')
    }

    await topic.destroy()

    return { message: 'Топик успешно удален' }
  }

  static async updateTopic(
    topicId: number,
    userId: number,
    updateData: { title?: string; content?: string }
  ) {
    const topic = await TopicModel.findOne({
      where: { id: topicId, userId: userId },
    })

    if (!topic) {
      throw new Error('Топик не найден или у вас нет прав на редактирование')
    }

    return topic.update(updateData)
  }
}
