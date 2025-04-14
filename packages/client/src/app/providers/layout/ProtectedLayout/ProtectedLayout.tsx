import { ROUTES } from '@/shared/constants/routes'
import { withAuthCheck } from '@/shared/hoks/withAuthCheck/withAuthCheck'
import { Outlet } from 'react-router'

const ProtectedLayoutBase = () => {
  return <Outlet />
}

export const ProtectedLayout = withAuthCheck(ProtectedLayoutBase, {
  isPrivate: true,
  redirectTo: ROUTES.LOGIN,
  showLoader: true,
})
