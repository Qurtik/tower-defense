import { ROUTES } from '@/shared/constants/routes'
import { withAuthCheck } from '../../hocs/withAuthCheck/withAuthCheck'
import { Outlet } from 'react-router'

const PublicLayoutBase = () => {
  return <Outlet />
}

export const PublicLayout = withAuthCheck(PublicLayoutBase, {
  isPrivate: false,
  redirectTo: ROUTES.ROOT,
  showLoader: true,
})
