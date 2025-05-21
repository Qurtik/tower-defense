import { CommentModel } from '../model/model'

export class CommentService {
  static async create(content: string, topicId: number, userId: number) {
    return CommentModel.create({ content, topicId, userId })
  }

  static async getByTopicId(topicId: number) {
    return CommentModel.findAll({
      where: { topicId },
      order: [['createdAt', 'ASC']],
      include: ['user'],
    })
  }

  static async delete(id: number) {
    const comment = await CommentModel.findByPk(id)
    if (!comment) throw new Error('Комментарий не найден')
    return comment.destroy()
  }
}
