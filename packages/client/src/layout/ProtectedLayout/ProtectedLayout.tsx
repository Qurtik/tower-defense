import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

export const ProtectedLayout = () => {
  const navigate = useNavigate()

  const isAuthenticated = document.cookie.includes('user-token=')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null
  }

  return <Outlet />
}
