import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { authModel } from '../../entities/user/model/authModel'

export const ProtectedLayout = () => {
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
    if (isAuthenticated === false) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null
  }

  return <Outlet />
}
