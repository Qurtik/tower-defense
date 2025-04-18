import { Outlet } from 'react-router'
import styles from './MainLayout.module.scss'
import { Header } from '@/widgets/Header'
import { useAppSelector } from '@/shared/hooks/hooksRedux/hooksRedux'
import { selectIsAuthenticated } from '@/entities/User'

export const MainLayout = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

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
