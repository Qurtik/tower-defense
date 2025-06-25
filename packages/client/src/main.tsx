import ReactDOM from 'react-dom/client'
import '@/app/providers/styles/normilize.scss'
import { Provider } from 'react-redux'
import { store } from './app/store/store'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { routes } from './app/providers/routes/routes'

const router = createBrowserRouter(routes)

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
