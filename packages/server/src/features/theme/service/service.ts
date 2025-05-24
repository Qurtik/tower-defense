import { ThemeModel, UserThemeModel } from '../model/model'

import { defaultTheme } from './../../../app/config/constants'

export class ThemeService {
  static async createTheme(themeId: string, description: string) {
    return ThemeModel.create({ themeId, description })
  }

  static async getAllThemes() {
    const Themes = await ThemeModel.findAll()

    return Themes.map(Theme => ({
      ...Theme.get({ plain: true }),
    }))
  }

  static async getUserTheme(userId: number) {
    const userTheme: UserThemeModel | null = await UserThemeModel.findOne({
      where: { userId: userId },
      include: [{ model: ThemeModel, attributes: ['themeId'] }],
    })
    if (userTheme && userTheme.theme.themeId) {
      return userTheme.theme.themeId
    }
    return defaultTheme
  }

  static async deleteUserTheme(userId: number) {
    const userTheme = await UserThemeModel.findOne({
      where: { userId: userId },
    })
    if (!userTheme) {
      throw new Error('Тема пользователя не найдена')
    }
    await userTheme.destroy()
    return { message: 'Тема пользователя успешно удалена' }
  }

  static async upsertUserTheme(themeId: string, userId: number) {
    const [currentUserTheme, _] = await UserThemeModel.upsert({
      userId,
      themeId,
    })
    return currentUserTheme
  }
}
