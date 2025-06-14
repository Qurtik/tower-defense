import { CommentReactionModel } from '../model/model'

export class CommentReactionService {
  static async create(emoji?: string, idComment?: number, authorId?: number) {
    if (!emoji || !idComment || !authorId) {
      throw new Error('Обязательный параметр не передан')
    }

    const isEmojiExist = await CommentReactionModel.findOne({
      where: { emoji, idComment, authorId },
    })

    if (isEmojiExist) {
      throw new Error('Эмодзи уже существует')
    }

    return CommentReactionModel.create({ emoji, idComment, authorId })
  }

  static async getReactionsByIdComment(idComment: number) {
    const reactions = await CommentReactionModel.findAll({
      where: { idComment },
      // include: ['user'],
    })

    return reactions
  }

  static async delete(emoji: string, idComment: number, authorId: number) {
    const reaction = await CommentReactionModel.findOne({
      where: { emoji, idComment, authorId },
    })
    if (!reaction) throw new Error('Комментарий не найден')
    return reaction.destroy()
  }
}
