import { useState } from 'react'
import { RouterProvider } from 'react-router'
import { ConfigProvider } from 'antd'
import './App.module.scss'
import Background from './Background/Background'
import styles from './App.module.scss'
import { darkTheme, lightTheme } from '@/app/providers/styles/antTokens'
import router from '@/app/providers/routes/routes'
import { Themes } from '@/shared/constants/themes'
import { ThemeContext } from '@/shared/context/ThemeContext/ThemeContext'

/* function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return <div className="App">Вот тут будет жить ваше приложение :)</div>
} */

function App() {
  const [theme, setTheme] = useState<Themes>(Themes.DARK)

  const antdTheme = theme === Themes.LIGHT ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ConfigProvider theme={antdTheme}>
        <div className={styles.app}>
          <Background />
          <RouterProvider router={router} />
        </div>
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export default App
