import { CommentReactionModel } from '../model/model'

export class CommentReactionService {
  static async create(emoji?: string, idComment?: number, authorId?: number) {
    if (!emoji || !idComment || !authorId) {
      throw new Error('Обязательный параметр не передан')
    }

    return CommentReactionModel.create({ emoji, idComment, authorId })
  }

  static async getReactionsByIdComment(idComment: number) {
    const reactionsExists = await CommentReactionModel.findByPk(idComment)
    if (!reactionsExists) {
      return []
    }

    const reactions = await CommentReactionModel.findAll({
      where: { idComment },
      // include: ['user'],
    })

    return reactions
  }

  static async delete(emoji: string, idComment: number, authorId: number) {
    const comment = await CommentReactionModel.findOne({
      where: { emoji, idComment, authorId },
    })
    if (!comment) throw new Error('Комментарий не найден')
    return comment.destroy()
  }
}
