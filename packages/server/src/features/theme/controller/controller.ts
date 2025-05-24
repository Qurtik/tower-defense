import { Request, Response } from 'express'

import { ThemeService } from '../service/service'

export class ThemeController {
  static async createTheme(req: Request, res: Response) {
    try {
      const { theme, description } = req.body

      if (!theme.trim()) {
        res
          .status(400)
          .json({ error: 'Название темы обязательно для заполнения!' })
      }

      const Theme = await ThemeService.createTheme(theme, description)
      res.status(201).json(Theme)
    } catch (error) {
      res.status(500).json({ error: 'Ошибка создания темы' })
    }
  }

  static async getAllThemes(_req: Request, res: Response) {
    try {
      const Themes = await ThemeService.getAllThemes()
      res.json(Themes)
    } catch (error) {
      res.status(500).json({ error: 'Ошибка получения списка тем' })
    }
  }

  static async getUserTheme(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.body
      const Theme = await ThemeService.getUserTheme(Number(userId))
      return res.json(Theme)
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Ошибка получения темы пользователя' })
    }
  }

  static async deleteUserTheme(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.body
      const result = await ThemeService.deleteUserTheme(Number(userId))
      return res.status(200).json(result)
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Ошибка удаления темы пользователя' })
    }
  }

  static async upsertUserTheme(req: Request, res: Response) {
    try {
      const { themeId, userId } = req.body

      const upsertedTheme = await ThemeService.upsertUserTheme(
        themeId,
        Number(userId)
      )

      return res.status(200).json(upsertedTheme)
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Ошибка при изменения темы пользователя' })
    }
  }
}
