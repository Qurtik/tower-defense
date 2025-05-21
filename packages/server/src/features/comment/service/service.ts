import { UserModel } from '../../user'
import { TopicModel } from '../../topic'
import { CommentModel } from '../model/model'

export class CommentService {
  static async create(content: string, topicId: number, userId: number) {
    const topicExists = await TopicModel.findByPk(topicId)

    if (!topicExists) {
      throw new Error('Топик с указанным ID не найден')
    }

    const userExists = await UserModel.findByPk(userId)
    if (!userExists) {
      throw new Error('Пользователь с указанным ID не найден')
    }

    return CommentModel.create({ content, topicId, userId })
  }

  static async getByTopicId(topicId: number, userId?: number) {
    const topicExists = await TopicModel.findByPk(topicId)
    if (!topicExists) {
      throw new Error('Тема с указанным ID не найдена')
    }

    const comments = await CommentModel.findAll({
      where: { topicId },
      order: [['createdAt', 'ASC']],
      include: ['user'],
    })

    return comments.map(comment => ({
      ...comment.get({ plain: true }),
      editable: userId ? comment.userId === userId : false,
    }))
  }

  static async delete(id: number) {
    const comment = await CommentModel.findByPk(id)
    if (!comment) throw new Error('Комментарий не найден')
    return comment.destroy()
  }

  static async updateComment(
    commentId: number,
    userId: number,
    content: string
  ) {
    const comment = await CommentModel.findOne({
      where: { id: commentId, userId },
    })

    if (!comment) {
      throw new Error(
        'Комментарий не найден или у вас нет прав на редактирование'
      )
    }

    return comment.update({ content })
  }
}
