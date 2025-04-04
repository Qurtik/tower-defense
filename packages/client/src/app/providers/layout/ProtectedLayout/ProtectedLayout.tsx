import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { authModel } from '../../entities/user/model/authModel'
import { ROUTES } from '../../routes/RouteConfig'

export const ProtectedLayout = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      if (authModel.getAuth()) {
        setIsAuthenticated(true)
        return
      }

      try {
        await authModel.getUserInfo()
        setIsAuthenticated(true)
      } catch (error) {
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate(ROUTES.LOGIN)
    }
  }, [isAuthenticated, navigate])

  if (isAuthenticated === null) {
    return null
  }

  return <Outlet />
}
