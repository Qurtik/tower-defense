import { withAuthCheck } from '@/shared/hoks/withAuthCheck/withAuthCheck'
import { Outlet } from 'react-router'

const PublicLayoutBase = () => {
  return <Outlet />
}

export const PublicLayout = withAuthCheck(PublicLayoutBase, {
  isPrivate: false,
  showLoader: true,
})
