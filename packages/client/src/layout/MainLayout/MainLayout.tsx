import { Outlet } from 'react-router'
import styles from './MainLayout.module.scss'
import { Header } from '../../components/Header'
import { useEffect } from 'react'
import { authModel } from '../../entities/user/model/authModel'
export const MainLayout = () => {
  useEffect(() => {
    const checkAuth = async () => {
      await authModel.getUserInfo()
    }
    checkAuth()
  })

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
