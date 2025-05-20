import { Comment } from '../model'

export class CommentService {
  static async create(content: string, topicId: number) {
    return Comment.create({ content, topicId })
  }

  static async getByTopicId(topicId: number) {
    return Comment.findAll({
      where: { topicId },
      order: [['createdAt', 'ASC']],
    })
  }

  static async delete(id: number) {
    const comment = await Comment.findByPk(id)
    if (!comment) throw new Error('Комментарий не найден')
    return comment.destroy()
  }
}
