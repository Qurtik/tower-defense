import { ComponentType, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { SpinLoader } from '@/shared/ui/Loader'
import { ROUTES } from '@/shared/constants/routes'
import { useAuthCheck } from '@/shared/hooks/useAuthCheck/useAuthCheck'

type WithAuthCheckOptions = {
  isPrivate?: boolean
  redirectTo?: ROUTES
  showLoader?: boolean
}

export function withAuthCheck<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthCheckOptions = {}
) {
  const { isPrivate = true, redirectTo, showLoader = true } = options

  return function WithAuthCheckComponent(props: P) {
    const navigate = useNavigate()
    const { isAuthenticated, isLoading } = useAuthCheck()

    useEffect(() => {
      if (isLoading) return

      const timer = setTimeout(() => {
        if (isPrivate && !isAuthenticated && redirectTo) {
          navigate(redirectTo, { replace: true })
        } else if (!isPrivate && isAuthenticated && redirectTo) {
          navigate(redirectTo, { replace: true })
        }
      }, 100)

      return () => clearTimeout(timer)
    }, [isAuthenticated, navigate, isLoading])

    if (isLoading && showLoader) {
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
