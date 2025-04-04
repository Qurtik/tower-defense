import { Outlet } from 'react-router'
import styles from './MainLayout.module.scss'
import { Header } from '@/widgets/Header'

export const MainLayout = () => {
  return (
    <>
      <div className={styles.layout}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </>
  )
}
