import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { authModel } from '../../entities/user/model/authModel'
import { ROUTES } from '../../routes/RouteConfig'

export const PublicLayout = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
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
    if (isAuthenticated) {
      navigate(ROUTES.ROOT)
    }
  }, [isAuthenticated, navigate])

  if (isAuthenticated || isAuthenticated === null) {
    return null
  }

  return <Outlet />
}
