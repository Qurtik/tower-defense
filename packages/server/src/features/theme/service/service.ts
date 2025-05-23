import { ThemeModel } from '../model/model'

export class ThemeService {
  static async createTheme(title: string, content: string, userId: number) {
    return ThemeModel.create({ title, content, userId })
  }

  static async getAllThemes(userId?: number) {
    const Themes = await ThemeModel.findAll()

    return Themes.map(Theme => ({
      ...Theme.get({ plain: true }),
      editable: userId ? Theme.userId === userId : false,
    }))
  }

  static async getThemeById(id: number, userId: number) {
    const Theme = await ThemeModel.findByPk(id, {
      include: ['comments', 'user'],
    })

    if (!Theme) {
      throw new Error('Топика с указанным id не существует')
    }

    return [{ Theme, editable: Theme?.userId === userId }]
  }

  static async deleteTheme(ThemeId: number, userId: number) {
    const Theme = await ThemeModel.findOne({
      where: { id: ThemeId, userId: userId },
    })

    if (!Theme) {
      throw new Error('Топик не найден')
    }

    await Theme.destroy()

    return { message: 'Топик успешно удален' }
  }

  static async updateTheme(
    ThemeId: number,
    userId: number,
    updateData: { title?: string; content?: string }
  ) {
    const Theme = await ThemeModel.findOne({
      where: { id: ThemeId, userId: userId },
    })

    if (!Theme) {
      throw new Error('Топик не найден или у вас нет прав на редактирование')
    }

    return Theme.update(updateData)
  }
}
