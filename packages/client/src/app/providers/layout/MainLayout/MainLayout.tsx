import { Outlet } from 'react-router'
import styles from './MainLayout.module.scss'
import { Header } from '@/widgets/Header'
import { useAppSelector } from '@/shared/hooks/hooksRedux/hooksRedux'
import { selectIsAuthenticated } from '@/entities/User'
import { startServiceWorker } from '../../service-worker'
import { useEffect, useState } from 'react'
import { Themes } from '@/shared/constants/themes'
import { darkTheme, lightTheme } from '../../styles/antTokens'
import { ThemeContext } from '@/shared/context/ThemeContext'
import { ConfigProvider } from 'antd'
import Background from '@/app/Background/Background'

export const MainLayout = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const [theme, setTheme] = useState<Themes>(Themes.DARK)

  const antdTheme = theme === Themes.LIGHT ? lightTheme : darkTheme

  useEffect(() => {
    startServiceWorker()
  }, [])

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ConfigProvider theme={antdTheme}>
          <div className={styles.layout}>
            <Header isAuthenticated={isAuthenticated} />
            <main className={styles.main}>
              <Background />
              <Outlet />
            </main>
          </div>
        </ConfigProvider>
      </ThemeContext.Provider>
    </>
  )
}
