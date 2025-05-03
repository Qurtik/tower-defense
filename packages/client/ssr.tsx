import App from '@/app/App'
import ReactDOMServer from 'react-dom/server'

export function render() {
  return ReactDOMServer.renderToString(<App />)
}
