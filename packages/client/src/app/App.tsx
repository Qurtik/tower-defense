import styles from './App.module.scss'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { RouterProvider } from 'react-router'
import { ConfigProvider } from 'antd'

import Background from './Background/Background'
import router from './providers/routes/routes'
import { darkTheme, lightTheme } from './providers/styles/antTokens'
import { startServiceWorker } from './providers/service-worker'

import ErrorBoundary from './providers/ErrorBoundary/ErrorBoundary'
import { ThemeContext } from '@/shared/context/ThemeContext'
import { Themes } from '@/shared/constants/themes'

startServiceWorker()

function App() {
  const [theme, setTheme] = useState<Themes>(Themes.DARK)

  const antdTheme = theme === Themes.LIGHT ? lightTheme : darkTheme

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <ConfigProvider theme={antdTheme}>
            <div className={styles.app}>
              <Background />
              <RouterProvider router={router} />
            </div>
          </ConfigProvider>
        </ThemeContext.Provider>
      </Provider>
    </ErrorBoundary>
  )
}

export default App
