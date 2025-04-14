import { useEffect, useState } from 'react'
import { authModel } from '@/entities/User/model'

export const useAuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const status = await authModel.isAuthenticated()
      setIsAuthenticated(status)
    }
    checkAuth()

    const unsubscribe = authModel.onAuthChange(status => {
      setIsAuthenticated(status)
    })

    return () => unsubscribe()
  }, [])

  return {
    isAuthenticated,
    isLoading: isAuthenticated === null,
  }
}
