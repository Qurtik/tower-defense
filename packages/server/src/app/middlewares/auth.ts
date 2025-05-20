import { Request, Response, NextFunction } from 'express'

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (!req.cookies?.authCookie || !req.cookies?.uuid) {
    return res.status(401).json({ error: 'Пользователь не авторизован' })
  }
  next()
}
