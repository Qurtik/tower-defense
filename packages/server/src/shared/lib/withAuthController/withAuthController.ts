import { Request, Response } from 'express'

export function withAuthController(
  handler: (req: Request, res: Response, userId: number) => Promise<unknown>
) {
  return async function (req: Request, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: 'Пользователь не авторизован' })
      }
      return await handler(req, res, req.userId)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
    }
  }
}
