import { NextFunction, Request, Response } from 'express'

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
    req.userId = userData.id
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Пользователь не авторизован' })
  }
}
export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  if (checkIfAdmin(req)) {
    return next()
  } else {
    return res.status(401).json({ error: 'Не достаточно прав' })
  }
}

export async function parseUserId(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<Response | void> {
  req.userId = await getUserIdFromReq(req)
  next()
}

async function getUserIdFromReq(req: Request): Promise<number | undefined> {
  const { authCookie, uuid } = req.cookies
  if (!authCookie || !uuid) {
    return undefined
  }

  const user = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
    headers: { Cookie: `authCookie=${authCookie}; uuid=${uuid}` },
  })

  const userData = await user.json()

  return userData.id
}

// TODO добавить авторизацию администраторов для действий с темами
function checkIfAdmin(req: Request): boolean {
  if (req.userId) {
    return true
  } else return false
}
