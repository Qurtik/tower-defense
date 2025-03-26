import './App.css'
import { RouterProvider } from 'react-router'
import router from '../routes/routes'

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
  return <RouterProvider router={router} />
}

export default App
