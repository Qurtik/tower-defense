import { Request, Response } from 'express'
import { UserService } from '../service/service'

export class UserController {
  static async upsertUser(req: Request, res: Response) {
    try {
      const userData = req.body.data

      if (!userData.id) {
        return res.status(400).json({ error: 'Не указан id пользователя!' })
      }

      const { user, wasCreated } = await UserService.upsertUser(userData)

      return res.status(wasCreated ? 201 : 200).json({
        success: true,
        user,
        message: wasCreated
          ? 'Пользователь успешно создан'
          : 'Данные пользователя успешно обновлены',
      })
    } catch (error) {
      console.error('Ошибка создания пользователя:', error)
      return res.status(500).json({
        error: 'Ошибка обработки данных пользователя',
        details: error instanceof Error ? error.message : String(error),
      })
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.params.id)

      if (!user) {
        return res
          .status(404)
          .json({ error: 'Данные пользователя не обнаружены' })
      }

      return res.json(user)
    } catch (error) {
      console.error('Ошибка получения данных пользователя:', error)
      return res
        .status(500)
        .json({ error: 'Ошибка получения данных пользователя' })
    }
  }
}
