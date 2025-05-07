import ReactDOM from 'react-dom/client'
import '@/app/providers/styles/normilize.scss'
import App from './app/App'

ReactDOM.hydrateRoot(document.getElementById('root') as HTMLElement, <App />)
