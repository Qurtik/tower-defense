import { Request, Response, NextFunction } from 'express'

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { authCookie, uuid } = req.cookies
    if (!authCookie || !uuid) {
      return res.status(401).json({ error: 'Пользователь не авторизован' })
    }

    const user = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: { Cookie: `authCookie=${authCookie}; uuid=${uuid}` },
    })

    if (!user.ok) throw new Error('Invalid cookies')

    const userData = await user.json()
    console.log('123')
    req.userId = userData.id
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Пользователь не авторизован' })
  }
}
