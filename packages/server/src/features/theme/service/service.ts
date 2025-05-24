import { ThemeModel, UserThemeModel } from '../model/model'

import { defaultTheme } from './../../../app/config/constants'

export class ThemeService {
  static async createTheme(theme: string, description: string) {
    return ThemeModel.create({ theme, description })
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
      include: [{ model: ThemeModel, attributes: ['theme'] }],
    })
    if (userTheme && userTheme.theme.theme) {
      return userTheme.theme.theme
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
    const currentTheme = await UserThemeModel.findOne({
      where: { userId: userId },
    })

    if (!currentTheme) {
      return UserThemeModel.create({ userId, themeId })
    }

    return currentTheme.update({ userId, themeId })
  }
}
