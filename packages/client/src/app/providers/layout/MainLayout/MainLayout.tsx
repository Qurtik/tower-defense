import { Outlet } from 'react-router'
import styles from './MainLayout.module.scss'
import { Header } from '@/widgets/Header'
import { useAuthCheck } from '@/shared/hooks/useAuthCheck/useAuthCheck'

export const MainLayout = () => {
  const { isAuthenticated } = useAuthCheck()

  return (
    <>
      <div className={styles.layout}>
        <Header isAuthenticated={isAuthenticated} />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </>
  )
}
