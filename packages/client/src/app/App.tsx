import './App.module.scss'

import { darkTheme, lightTheme } from './providers/styles/antTokens'

import Background from './Background/Background'
import { ConfigProvider } from 'antd'
import ErrorBoundary from '@/shared/lib/errors/ErrorBoundary'
import { RouterProvider } from 'react-router'
import { ThemeContext } from '@/shared/context/ThemeContext'
import { Themes } from '@/shared/constants/themes'
import router from './providers/routes/routes'
import styles from './App.module.scss'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

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
