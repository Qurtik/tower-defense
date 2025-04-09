import { ComponentType, useEffect, useState } from 'react'
import { authModel } from '@/entities/User/model'
import { useNavigate } from 'react-router'
import { SpinLoader } from '@/shared/ui/Loader'

type WithAuthCheckOptions = {
  isPrivate?: boolean
  redirectTo?: string
  showLoader?: boolean
}

export function withAuthCheck<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthCheckOptions = {}
) {
  const { isPrivate = true, redirectTo, showLoader = true } = options

  return function WithAuthCheckComponent(props: P) {
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
      if (isAuthenticated === null) return

      if (isPrivate && !isAuthenticated && redirectTo) {
        navigate(redirectTo)
      } else if (!isPrivate && isAuthenticated && redirectTo) {
        navigate(redirectTo)
      }
    }, [isAuthenticated, navigate])

    if (isAuthenticated === null && showLoader) {
      return <SpinLoader delay={200} tipLoader="Загрузка" />
    }

    if (isPrivate && !isAuthenticated) {
      return null
    }

    if (!isPrivate && isAuthenticated) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}
