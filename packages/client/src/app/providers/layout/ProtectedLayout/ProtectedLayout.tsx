import { authModel } from '@/entities/user/model'
import { ROUTES } from '@/shared/constants/routes'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'

export const ProtectedLayout = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const statusAuth = await authModel.isAuthenticated()
      setIsAuthenticated(statusAuth)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate(ROUTES.LOGIN)
    }
  }, [isAuthenticated, navigate])

  if (isAuthenticated === null || !isAuthenticated) {
    return null
  }

  return <Outlet />
}
