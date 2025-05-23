import { Request, Response } from 'express'

import { ThemeService } from '../service/service'

export class ThemeController {
  static async createTheme(req: Request, res: Response) {
    try {
      const { title, content, userId } = req.body

      if (!userId) {
        res.status(401).json({ error: 'Пользователь не авторизован!' })
      }

      if (!title.trim()) {
        res
          .status(400)
          .json({ error: 'Название топика обязательно для заполнения!' })
      }

      if (!content.trim()) {
        res
          .status(400)
          .json({ error: 'Содержимое топика обязательно для заполнения!' })
      }

      const Theme = await ThemeService.createTheme(
        title,
        content,
        Number(userId)
      )
      res.status(201).json(Theme)
    } catch (error) {
      res.status(500).json({ error: 'Ошибка создания топика' })
    }
  }

  static async getAllThemes(req: Request, res: Response) {
    try {
      const userId = req.body.userId
      const Themes = await ThemeService.getAllThemes(Number(userId))
      res.json(Themes)
    } catch (error) {
      res.status(500).json({ error: 'Ошибка получения топиков' })
    }
  }

  static async getThemeById(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.body
      const Theme = await ThemeService.getThemeById(
        Number(req.params.id),
        Number(userId)
      )

      return res.json(Theme)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('не существует')) {
          return res.status(404).json({ error: error.message })
        }
      }
      return res.status(500).json({ error: 'Ошибка получения топиков' })
    }
  }

  static async deleteTheme(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.body
      const result = await ThemeService.deleteTheme(
        Number(req.params.id),
        Number(userId)
      )
      return res.status(200).json(result)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Топик не найден') {
          return res.status(404).json({ error: error.message })
        }
        return res.status(500).json({ error: 'Ошибка удаления топика' })
      }
      return res.status(500).json({ error: 'Неизвестная ошибка' })
    }
  }

  static async updateTheme(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { title, content, userId } = req.body

      const updatedTheme = await ThemeService.updateTheme(
        Number(id),
        Number(userId),
        {
          title,
          content,
        }
      )

      return res.status(200).json(updatedTheme)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('не найден')) {
          return res.status(403).json({ error: error.message })
        }
      }
      return res.status(500).json({ error: 'Ошибка при редактировании топика' })
    }
  }
}
