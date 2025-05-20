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
}
